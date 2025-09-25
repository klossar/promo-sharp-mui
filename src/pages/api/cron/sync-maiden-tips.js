import { db } from '../../../lib/db.js';

export default async function handler(req, res) {
  // Verify this is a Vercel cron request
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    console.log('Starting maiden horse racing tips sync...');

    // Fetch tips from WhaleBettor API
    const response = await fetch('https://whalebettor.com/api/v2/The%20Jump%20Outs/Tips');

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const apiTips = await response.json();
    console.log(`Fetched ${apiTips.length} tips from API`);

    let newTipsCount = 0;
    let updatedTipsCount = 0;

    for (const tip of apiTips) {
      try {
        // Parse the date
        const raceDate = new Date(tip.Date);

        if (isNaN(raceDate.getTime())) {
          console.warn(`Invalid date for tip: ${tip.Date}`);
          continue;
        }

        // Prepare tip data
        const tipData = {
          date: raceDate,
          track: tip.Track || '',
          race: parseInt(tip.Race) || 0,
          selection: tip.Selection || '',
          winOdds: tip['Win Odds'] ? parseFloat(tip['Win Odds']) : null,
          invested: tip.Invested ? parseFloat(tip.Invested) : null,
          returned: tip.Returned ? parseFloat(tip.Returned) : null,
          profit: tip.Profit ? parseFloat(tip.Profit) : null,
          analysis: tip.Analysis || null,
          result: tip.Result || null,
          winBookie: tip['Win Bookie'] || null,
        };

        // Use upsert to create or update
        const result = await db.maidenHorseRacingTip.upsert({
          where: {
            date_track_race_selection: {
              date: tipData.date,
              track: tipData.track,
              race: tipData.race,
              selection: tipData.selection,
            },
          },
          update: {
            winOdds: tipData.winOdds,
            invested: tipData.invested,
            returned: tipData.returned,
            profit: tipData.profit,
            analysis: tipData.analysis,
            result: tipData.result,
            winBookie: tipData.winBookie,
            updatedAt: new Date(),
          },
          create: tipData,
        });

        if (result.createdAt.getTime() === result.updatedAt.getTime()) {
          newTipsCount++;
        } else {
          updatedTipsCount++;
        }

      } catch (tipError) {
        console.error(`Error processing tip:`, tipError, tip);
        continue;
      }
    }

    console.log(`Sync completed: ${newTipsCount} new tips, ${updatedTipsCount} updated tips`);

    res.status(200).json({
      success: true,
      message: `Sync completed successfully`,
      stats: {
        totalProcessed: apiTips.length,
        newTips: newTipsCount,
        updatedTips: updatedTipsCount,
      },
    });

  } catch (error) {
    console.error('Error syncing maiden tips:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}