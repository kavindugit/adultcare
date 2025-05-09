import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, CircularProgress, Paper, Stack, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PackageRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/package-requests/pending", {
        withCredentials: true,
      });
      if (response.status === 200) {
        const data = response.data.data;
        console.log("Pending Requests:", data);

        const initialRequests = data.map(req => ({
          ...req,
          packageName: "Loading...",
          guardianName: "Loading...",
          adultName: "Loading...",
        }));
        setRequests(initialRequests);

        const enrichedRequests = await Promise.all(
          data.map(async (req) => {
            let packageName = "Unknown Package";
            let guardianName = "Unknown Guardian";
            let adultName = "Unknown Adult";

            try {
              const packageResponse = await axios.get(`http://localhost:4000/api/packages/${req.packageId}`, {
                withCredentials: true,
              });
              packageName = packageResponse.data.data?.name || "Unknown Package";
              console.log(`Package (${req.packageId}):`, packageResponse.data);
            } catch (err) {
              console.error(`Error fetching package ${req.packageId}:`, err);
            }

            try {
              const guardianResponse = await axios.get(`http://localhost:4000/api/user/${req.guardianId}`, {
                withCredentials: true,
              });
              guardianName = guardianResponse.data.data?.fullName || "Unknown Guardian";
              console.log(`Guardian (${req.guardianId}):`, guardianResponse.data);
            } catch (err) {
              console.error(`Error fetching guardian ${req.guardianId}:`, err);
            }

            try {
              const adultResponse = await axios.get(`http://localhost:4000/api/user/${req.adultId}`, {
                withCredentials: true,
              });
              adultName = adultResponse.data.data?.fullName || "Unknown Adult";
              console.log(`Adult (${req.adultId}):`, adultResponse.data);
            } catch (err) {
              console.error(`Error fetching adult ${req.adultId}:`, err);
            }

            return {
              ...req,
              packageName,
              guardianName,
              adultName,
            };
          })
        );

        setRequests(enrichedRequests);
        setError(null);
      } else {
        throw new Error("An error occurred while fetching data");
      }
    } catch (err) {
      console.error("Error fetching requests:", err);
      setError("An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleManageSchedule = (requestId, packageId, adultId, guardianId) => {
    navigate(`/schedule-manager/${requestId}`, {
      state: { packageId, adultId, guardianId },
    });
  };

  return (
    <Box>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      ) : requests.length === 0 ? (
        <Typography sx={{ mt: 2 }}>No pending requests available.</Typography>
      ) : (
        <Stack spacing={2} sx={{ mt: 2 }}>
          {requests.map((req) => (
            <Paper key={req.requestId} elevation={3} sx={{ p: 3, backgroundColor: "#f0f8ff" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1">
                    <strong>Request ID:</strong> {req.requestId}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Guardian:</strong> {req.guardianName}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Adult:</strong> {req.adultName}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Package:</strong> {req.packageName}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Typography variant="body1">
                    <strong>Status:</strong> {req.status}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Start Date:</strong>{" "}
                    {req.startDate ? new Date(req.startDate).toLocaleDateString() : "Not Scheduled"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Requested on: {new Date(req.createdAt).toLocaleString()}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={2} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleManageSchedule(req.requestId, req.packageId, req.adultId, req.guardianId)}
                  >
                    Manage Schedule
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default PackageRequests;