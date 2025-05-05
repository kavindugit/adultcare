import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { Calendar, Clock, Filter, Plus, Search } from "lucide-react";

import Navbar from "../../components/Reservations/layout/Navbar";
import Footer from "../../components/User/Footer";
import ReservationCard from "../../components/Reservations/dashboard/ReservationCard";
import axios from "axios";
import { toast } from "react-toastify";
import React from "react";
// ✅ Embedded mock reservation data
const RESERVATION_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};



const ReservationDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [tabValue, setTabValue] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const fetchSessions = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/sessions");

      setReservations(res.data);
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      console.error("Error fetching sessions", err);
      toast.error("Failed to load sessions.");
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  
  useEffect(() => {
    let result = [...reservations];
    if (statusFilter !== "all") {
      result = result.filter((r) => r.status === statusFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.patientName.toLowerCase().includes(q) ||
          r.serviceName.toLowerCase().includes(q) ||
          r.patientEmail.toLowerCase().includes(q)
      );
    }
    setFilteredReservations(result);
  }, [reservations, searchQuery, statusFilter]);

  const handleDeleteReservation = (id) => {
    setReservations((prev) =>
      prev.map((res) =>
        res.id === id ? { ...res, status: RESERVATION_STATUS.CANCELLED } : res
      )
    );
  };

  const getStatusCount = (status) =>
    status === "all"
      ? reservations.length
      : reservations.filter((r) => r.status === status).length;

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setStatusFilter(newValue);
  };

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 6, flex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
            flexDirection={{ xs: "column", md: "row" }}
            mb={4}
          >
            <Box>
              <Typography variant="h5" fontWeight="bold">
                My Reservations
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage your appointments and bookings
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Plus size={16} />}
              href="/booking"
              sx={{ mt: { xs: 2, md: 0 } }}
            >
              New Reservation
            </Button>
          </Box>

          {/* Tabs and Filters */}
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            sx={{ mb: 3 }}
          >
            <Tab label={`All (${getStatusCount("all")})`} value="all" />
            <Tab label={`Pending (${getStatusCount("pending")})`} value="pending" />
            <Tab label={`Confirmed (${getStatusCount("confirmed")})`} value="confirmed" />
            <Tab label={`Completed (${getStatusCount("completed")})`} value="completed" />
          </Tabs>

          <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={2} mb={3}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search reservations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <Search size={16} style={{ marginRight: 8, color: "#6b7280" }} />
                ),
              }}
            />
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel>Filter</InputLabel>
              <Select
                label="Filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                startAdornment={<Filter size={16} style={{ marginRight: 8 }} />}
              >
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="confirmed">Confirmed</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Reservation List */}
          {isLoading ? (
            <Grid container spacing={3}>
              {[...Array(4)].map((_, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <Box height={160} bgcolor="#f3f4f6" borderRadius={2} />
                </Grid>
              ))}
            </Grid>
          ) : filteredReservations.length > 0 ? (
            <Grid container spacing={3}>
              {filteredReservations.map((reservation) => (
                <Grid item xs={12} sm={6} key={reservation.id}>
                  <ReservationCard
                    reservation={reservation}
                    onDelete={handleDeleteReservation} onUpdate={undefined}                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box textAlign="center" py={8}>
              <Box
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                width={48}
                height={48}
                borderRadius="50%"
                bgcolor="#f3f4f6"
                mb={2}
              >
                <Calendar size={24} color="#9ca3af" />
              </Box>
              <Typography variant="h6">No reservations found</Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                {searchQuery
                  ? "No reservations match your search criteria. Try a different search term."
                  : "You don't have any reservations yet. Create a new reservation to get started."}
              </Typography>
              <Button variant="outlined" href="/booking" startIcon={<Clock size={16} />}>
                Book an Appointment
              </Button>
            </Box>
          )}
        </motion.div>
      </Container>

      <Footer />
    </Box>
  );
};

export default ReservationDashboard;
