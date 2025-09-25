import { db } from '../../../lib/db.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { page = 1, limit = 20, date } = req.query;
      const skip = (page - 1) * limit;

      const where = {};
      if (date) {
        const startDate = new Date(date);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 1);

        where.date = {
          gte: startDate,
          lt: endDate,
        };
      }

      const tips = await db.maidenHorseRacingTip.findMany({
        where,
        orderBy: [
          { date: 'desc' },
          { race: 'asc' }
        ],
        skip: parseInt(skip),
        take: parseInt(limit),
      });

      const total = await db.maidenHorseRacingTip.count({ where });

      res.status(200).json({
        tips,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error('Error fetching maiden horse racing tips:', error);
      res.status(500).json({ error: 'Failed to fetch tips' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}