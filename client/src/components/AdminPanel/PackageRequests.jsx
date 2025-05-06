import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, CircularProgress, Paper, Stack } from "@mui/material";

const PackageRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/packages/pending");
      if (response.status === 200) {
        setRequests(response.data.data);
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

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", color: "#002855" }}>
        Pending Package Requests
      </Typography>

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
            <Paper key={req._id} elevation={3} sx={{ p: 2, backgroundColor: "#f0f8ff" }}>
              <Typography variant="body1">
                <strong>Guardian ID:</strong> {req.guardianId}
              </Typography>
              <Typography variant="body1">
                <strong>Package ID:</strong> {req.packageId}
              </Typography>
              <Typography variant="body1">
                <strong>Status:</strong> {req.status}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Requested on: {new Date(req.createdAt).toLocaleString()}
              </Typography>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default PackageRequests;
