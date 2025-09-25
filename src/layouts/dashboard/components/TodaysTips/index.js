import React from "react";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// PromoSharp components
import TipCard from "components/tips/TipCard";

function TodaysTips() {
  const sampleTips = [
    {
      sport: "Premier League",
      selection: "Manchester City vs Arsenal - Over 2.5 Goals",
      odds: "1.85",
      confidence: "high",
      promotion: "Risk Free Bet up to $50",
      analysis: "Both teams have scored in their last 5 meetings. City averaging 2.8 goals at home, Arsenal 1.6 away.",
      matchTime: "Today 3:00 PM",
      bookmaker: "Bet365"
    },
    {
      sport: "NBA",
      selection: "Lakers +4.5 vs Warriors",
      odds: "1.91",
      confidence: "medium",
      promotion: null,
      analysis: "Lakers coming off strong road win. Warriors missing key players. Value in the spread.",
      matchTime: "Tonight 10:30 PM",
      bookmaker: "DraftKings"
    },
    {
      sport: "Horse Racing",
      selection: "Thunderbolt - Win at Cheltenham 2:15",
      odds: "3.50",
      confidence: "high",
      promotion: "Price Boost - was 3.20",
      analysis: "Excellent form on similar ground. Jockey/trainer combo has 28% strike rate at this course.",
      matchTime: "Today 2:15 PM",
      bookmaker: "Paddy Power"
    }
  ];

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Today's Top Tips
        </MDTypography>
        <MDTypography variant="button" color="text" fontWeight="regular">
          <MDTypography display="inline" variant="body2" verticalAlign="middle">
            <i className="fa fa-arrow-up text-success" style={{ fontSize: "12px" }} />
          </MDTypography>
          &nbsp;<strong>73% hit rate</strong> this month
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={3}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {sampleTips.map((tip, index) => (
            <TipCard
              key={index}
              sport={tip.sport}
              selection={tip.selection}
              odds={tip.odds}
              confidence={tip.confidence}
              promotion={tip.promotion}
              analysis={tip.analysis}
              matchTime={tip.matchTime}
              bookmaker={tip.bookmaker}
              onViewAnalysis={() => console.log(`View analysis for tip ${index + 1}`)}
            />
          ))}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default TodaysTips;