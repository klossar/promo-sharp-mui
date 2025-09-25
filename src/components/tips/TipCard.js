import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography, Chip, Button, Box, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[10],
  },
}));

const TipCard = ({
  sport,
  selection,
  odds,
  confidence,
  promotion,
  analysis,
  matchTime,
  bookmaker,
  onViewAnalysis,
}) => {
  const getConfidenceColor = (conf) => {
    switch (conf?.toLowerCase()) {
      case "high":
        return "success";
      case "medium":
        return "warning";
      case "low":
        return "error";
      default:
        return "info";
    }
  };

  const getConfidenceIcon = (conf) => {
    switch (conf?.toLowerCase()) {
      case "high":
        return "🔥";
      case "medium":
        return "⚡";
      case "low":
        return "📊";
      default:
        return "📈";
    }
  };

  return (
    <StyledCard
      sx={{
        mb: 2,
        border: 1,
        borderColor: "grey.200",
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <MDBox>
            <MDTypography variant="h6" color="primary" fontWeight="bold">
              {sport}
            </MDTypography>
            {matchTime && (
              <MDTypography variant="caption" color="text" opacity={0.7}>
                {matchTime}
              </MDTypography>
            )}
          </MDBox>
          <Chip
            label={`${getConfidenceIcon(confidence)} ${confidence?.toUpperCase()}`}
            color={getConfidenceColor(confidence)}
            size="small"
            sx={{ fontWeight: "bold" }}
          />
        </MDBox>

        <MDBox mb={2}>
          <MDTypography variant="h5" fontWeight="bold" color="dark" mb={1}>
            {selection}
          </MDTypography>
          <MDBox display="flex" alignItems="center" gap={1}>
            <MDTypography variant="h4" color="primary" fontWeight="bold">
              @{odds}
            </MDTypography>
            {bookmaker && (
              <Chip label={bookmaker} variant="outlined" size="small" color="primary" />
            )}
          </MDBox>
        </MDBox>

        {promotion && (
          <MDBox mb={2}>
            <Chip
              label={`🎁 ${promotion}`}
              color="secondary"
              variant="filled"
              size="medium"
              sx={{
                fontWeight: "bold",
                background: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
                color: "white",
              }}
            />
          </MDBox>
        )}

        <Divider sx={{ mb: 2 }} />

        <MDBox mb={3}>
          <MDTypography variant="body2" color="text" lineHeight={1.6}>
            {analysis || "Detailed analysis available in full view."}
          </MDTypography>
        </MDBox>

        <MDButton
          variant="gradient"
          color="primary"
          fullWidth
          onClick={onViewAnalysis}
          sx={{
            background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
              transform: "translateY(-1px)",
            },
          }}
        >
          View Full Analysis
        </MDButton>
      </CardContent>
    </StyledCard>
  );
};

TipCard.defaultProps = {
  confidence: "medium",
  promotion: null,
  analysis: "",
  matchTime: "",
  bookmaker: "",
  onViewAnalysis: () => {},
};

TipCard.propTypes = {
  sport: PropTypes.string.isRequired,
  selection: PropTypes.string.isRequired,
  odds: PropTypes.string.isRequired,
  confidence: PropTypes.oneOf(["low", "medium", "high"]),
  promotion: PropTypes.string,
  analysis: PropTypes.string,
  matchTime: PropTypes.string,
  bookmaker: PropTypes.string,
  onViewAnalysis: PropTypes.func,
};

export default TipCard;
