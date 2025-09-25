import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Rating,
  Box,
  Avatar,
} from "@mui/material";
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
    borderColor: theme.palette.secondary.main,
  },
}));

const PromotionCard = ({
  bookmaker,
  title,
  type,
  value,
  valueRating,
  expiryDate,
  description,
  terms,
  onClaim,
  logoUrl,
}) => {
  const getTypeColor = (promoType) => {
    switch (promoType?.toLowerCase()) {
      case "free bet":
        return "success";
      case "deposit bonus":
        return "primary";
      case "cashback":
        return "info";
      case "price boost":
        return "warning";
      default:
        return "secondary";
    }
  };

  const getTypeIcon = (promoType) => {
    switch (promoType?.toLowerCase()) {
      case "free bet":
        return "🎯";
      case "deposit bonus":
        return "💰";
      case "cashback":
        return "🛡️";
      case "price boost":
        return "🚀";
      default:
        return "🎁";
    }
  };

  const formatExpiryDate = (date) => {
    if (!date) return "";
    const now = new Date();
    const expiry = new Date(date);
    const diffTime = expiry - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Expired";
    if (diffDays === 0) return "Expires today";
    if (diffDays === 1) return "Expires tomorrow";
    return `${diffDays} days left`;
  };

  const isExpiringSoon = (date) => {
    if (!date) return false;
    const now = new Date();
    const expiry = new Date(date);
    const diffDays = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
    return diffDays <= 2;
  };

  return (
    <StyledCard>
      <CardContent sx={{ p: 3 }}>
        <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <MDBox display="flex" alignItems="center" gap={2}>
            {logoUrl && (
              <Avatar
                src={logoUrl}
                alt={bookmaker}
                sx={{ width: 48, height: 48 }}
              />
            )}
            <MDBox>
              <MDTypography variant="h6" fontWeight="bold" color="dark">
                {bookmaker}
              </MDTypography>
              <MDTypography variant="body2" color="text" opacity={0.8}>
                {title}
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox textAlign="center">
            <Rating
              value={valueRating}
              max={5}
              size="small"
              readOnly
              sx={{ mb: 0.5 }}
            />
            <MDTypography variant="caption" color="text">
              Value Rating
            </MDTypography>
          </MDBox>
        </MDBox>

        <MDBox display="flex" alignItems="center" gap={1} mb={2}>
          <Chip
            label={`${getTypeIcon(type)} ${type}`}
            color={getTypeColor(type)}
            size="medium"
            sx={{ fontWeight: "bold" }}
          />
          <MDTypography variant="h5" fontWeight="bold" color="secondary">
            {value}
          </MDTypography>
        </MDBox>

        <MDBox mb={2}>
          <MDTypography variant="body2" color="text" lineHeight={1.6} mb={1}>
            {description}
          </MDTypography>
          {terms && (
            <MDTypography variant="caption" color="text" opacity={0.7}>
              Terms: {terms}
            </MDTypography>
          )}
        </MDBox>

        <MDBox display="flex" justifyContent="space-between" alignItems="center">
          <MDBox>
            {expiryDate && (
              <Chip
                label={formatExpiryDate(expiryDate)}
                color={isExpiringSoon(expiryDate) ? "error" : "default"}
                size="small"
                variant="outlined"
              />
            )}
          </MDBox>
          <MDButton
            variant="gradient"
            color="secondary"
            size="medium"
            onClick={onClaim}
            sx={{
              background: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
                transform: "translateY(-1px)",
              },
            }}
          >
            Claim Now
          </MDButton>
        </MDBox>
      </CardContent>
    </StyledCard>
  );
};

PromotionCard.defaultProps = {
  valueRating: 3,
  description: "",
  terms: "",
  expiryDate: null,
  onClaim: () => {},
  logoUrl: null,
};

PromotionCard.propTypes = {
  bookmaker: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  valueRating: PropTypes.number,
  expiryDate: PropTypes.string,
  description: PropTypes.string,
  terms: PropTypes.string,
  onClaim: PropTypes.func,
  logoUrl: PropTypes.string,
};

export default PromotionCard;