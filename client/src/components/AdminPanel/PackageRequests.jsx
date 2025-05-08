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
      const response = await axios.get("http://localhost:4000/api/package-requests/pending");
      if (response.status === 200) {
        setRequests(response.data.data);
        console.log(response.data.data);
      } else {
        setError("Failed to fetch package requests.");
      }
    } catch (err) {
      console.error("Error fetching requests:", err);
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const handleManageSchedule = (requestId) => {
    navigate(`/schedule-manager/${requestId}`);
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
                    <strong>Guardian ID:</strong> {req.guardianId}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Adult ID:</strong> {req.adultId}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Package ID:</strong> {req.packageId}
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
                    onClick={() => handleManageSchedule(req.requestId)}
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
