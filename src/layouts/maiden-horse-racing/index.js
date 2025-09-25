import React, { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// PromoSharp components
import HorseRacingTipCard from "./components/HorseRacingTipCard";

function MaidenHorseRacing() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  });

  const fetchTips = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/tips/maiden-horse-racing?page=${page}&limit=20`);

      if (!response.ok) {
        throw new Error('Failed to fetch tips');
      }

      const data = await response.json();
      setTips(data.tips);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching tips:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTips();
  }, []);

  const handlePageChange = (event, page) => {
    fetchTips(page);
  };

  const getResultColor = (result) => {
    if (result === "1st") return "success";
    if (result === "2nd" || result === "3rd") return "warning";
    return "error";
  };

  const formatCurrency = (amount) => {
    if (!amount) return "-";
    return `$${amount.toFixed(2)}`;
  };

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox py={3} display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress color="primary" />
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox py={3}>
          <Card sx={{ p: 3, textAlign: "center" }}>
            <MDTypography variant="h5" color="error" mb={2}>
              Error Loading Tips
            </MDTypography>
            <MDTypography variant="body1" color="text" mb={3}>
              {error}
            </MDTypography>
            <Button variant="contained" color="primary" onClick={() => fetchTips()}>
              Try Again
            </Button>
          </Card>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ p: 3 }}>
                <MDBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <MDBox>
                    <MDTypography variant="h4" fontWeight="bold" color="primary">
                      🐎 Maiden Horse Racing Tips
                    </MDTypography>
                    <MDTypography variant="body1" color="text" opacity={0.7}>
                      Expert analysis and selections for maiden horse races
                    </MDTypography>
                  </MDBox>
                  <Chip
                    label={`${pagination.total} Total Tips`}
                    color="primary"
                    variant="outlined"
                  />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>

        <MDBox>
          <Grid container spacing={3}>
            {tips.length > 0 ? (
              tips.map((tip) => (
                <Grid item xs={12} md={6} lg={4} key={tip.id}>
                  <HorseRacingTipCard tip={tip} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Card sx={{ p: 3, textAlign: "center" }}>
                  <MDTypography variant="h6" color="text">
                    No tips available at the moment
                  </MDTypography>
                  <MDTypography variant="body2" color="text" opacity={0.7}>
                    Check back soon for new maiden horse racing tips
                  </MDTypography>
                </Card>
              </Grid>
            )}
          </Grid>
        </MDBox>

        {pagination.pages > 1 && (
          <MDBox display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={pagination.pages}
              page={pagination.page}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </MDBox>
        )}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MaidenHorseRacing;