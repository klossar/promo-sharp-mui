import React from "react";
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "all 0.2s ease-in-out",
  border: "1px solid",
  borderColor: theme.palette.grey[200],
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[8],
    borderColor: theme.palette.primary.main,
  },
}));

const HorseRacingTipCard = ({ tip }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-AU", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-AU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getResultColor = (result) => {
    if (!result) return "default";
    if (result === "1st") return "success";
    if (result === "2nd" || result === "3rd") return "warning";
    return "error";
  };

  const getProfitColor = (profit) => {
    if (!profit) return "text";
    return profit > 0 ? "success" : "error";
  };

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return "-";
    return `$${amount.toFixed(2)}`;
  };

  const getConfidenceFromOdds = (odds) => {
    if (!odds) return { level: "medium", icon: "📊" };
    if (odds <= 2.0) return { level: "high", icon: "🔥" };
    if (odds <= 4.0) return { level: "medium", icon: "⚡" };
    return { level: "low", icon: "📈" };
  };

  const confidence = getConfidenceFromOdds(tip.winOdds);

  return (
    <StyledCard>
      <CardContent sx={{ p: 3 }}>
        <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <MDBox>
            <MDTypography variant="h6" fontWeight="bold" color="primary" mb={0.5}>
              {tip.track}
            </MDTypography>
            <MDTypography variant="body2" color="text" opacity={0.8}>
              {formatDate(tip.date)} • Race {tip.race}
            </MDTypography>
          </MDBox>
          <MDBox textAlign="right">
            {tip.result && (
              <Chip
                label={tip.result}
                color={getResultColor(tip.result)}
                size="small"
                sx={{ mb: 1, fontWeight: "bold" }}
              />
            )}
            <MDBox>
              <Chip
                label={`${confidence.icon} ${confidence.level.toUpperCase()}`}
                color={confidence.level === "high" ? "success" : confidence.level === "medium" ? "warning" : "info"}
                size="small"
                sx={{ fontWeight: "bold" }}
              />
            </MDBox>
          </MDBox>
        </MDBox>

        <MDBox mb={2}>
          <MDTypography variant="h5" fontWeight="bold" color="dark" mb={1}>
            {tip.selection}
          </MDTypography>

          <MDBox display="flex" alignItems="center" gap={2} flexWrap="wrap">
            {tip.winOdds && (
              <MDBox display="flex" alignItems="center" gap={1}>
                <MDTypography variant="h4" color="primary" fontWeight="bold">
                  ${tip.winOdds}
                </MDTypography>
                <MDTypography variant="body2" color="text">
                  odds
                </MDTypography>
              </MDBox>
            )}

            {tip.profit !== null && (
              <Chip
                label={`${tip.profit >= 0 ? '+' : ''}${formatCurrency(tip.profit)} P&L`}
                color={getProfitColor(tip.profit)}
                variant="filled"
                size="medium"
                sx={{ fontWeight: "bold" }}
              />
            )}
          </MDBox>
        </MDBox>

        {(tip.invested || tip.returned) && (
          <MDBox mb={2}>
            <MDBox display="flex" justifyContent="space-between" alignItems="center">
              {tip.invested && (
                <MDBox>
                  <MDTypography variant="caption" color="text" display="block">
                    Invested
                  </MDTypography>
                  <MDTypography variant="body1" fontWeight="medium">
                    {formatCurrency(tip.invested)}
                  </MDTypography>
                </MDBox>
              )}

              {tip.returned && (
                <MDBox textAlign="right">
                  <MDTypography variant="caption" color="text" display="block">
                    Returned
                  </MDTypography>
                  <MDTypography variant="body1" fontWeight="medium" color="success">
                    {formatCurrency(tip.returned)}
                  </MDTypography>
                </MDBox>
              )}
            </MDBox>
          </MDBox>
        )}

        <Divider sx={{ mb: 2 }} />

        {tip.analysis && (
          <MDBox mb={3}>
            <MDTypography variant="body2" color="text" lineHeight={1.6}>
              {tip.analysis.length > 200
                ? `${tip.analysis.substring(0, 200)}...`
                : tip.analysis
              }
            </MDTypography>
          </MDBox>
        )}

        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          {tip.winBookie && (
            <Chip
              label={`Bookie: ${tip.winBookie}`}
              variant="outlined"
              size="small"
              color="primary"
            />
          )}

          <MDButton
            variant="gradient"
            color="primary"
            size="small"
            onClick={() => {
              // TODO: Open detailed view modal
              console.log('View details for tip:', tip.id);
            }}
            sx={{
              background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
              },
            }}
          >
            View Details
          </MDButton>
        </MDBox>
      </CardContent>
    </StyledCard>
  );
};

HorseRacingTipCard.propTypes = {
  tip: PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    track: PropTypes.string.isRequired,
    race: PropTypes.number.isRequired,
    selection: PropTypes.string.isRequired,
    winOdds: PropTypes.number,
    invested: PropTypes.number,
    returned: PropTypes.number,
    profit: PropTypes.number,
    analysis: PropTypes.string,
    result: PropTypes.string,
    winBookie: PropTypes.string,
  }).isRequired,
};

export default HorseRacingTipCard;