import { useState, useEffect } from "react";
import { format, addDays, startOfDay } from "date-fns";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
} from "@mui/material";
import { ChevronLeft, ChevronRight, AccessTime, CalendarToday } from "@mui/icons-material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

const AvailabilityCalendar = ({
  serviceDuration,
  onTimeSlotSelect,
  selectedDate,
  selectedTimeSlot,
}) => {
  const [date, setDate] = useState(selectedDate || new Date());
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [visibleTimeSlots, setVisibleTimeSlots] = useState([]);
  const [page, setPage] = useState(0);
  const slotsPerPage = 6;

  useEffect(() => {
    if (!date) return;

    const generateMockTimeSlots = () => {
      const slots = [];
      const day = startOfDay(date);

      for (let hour = 9; hour < 17; hour++) {
        for (let minute of [0, 30]) {
          const startTime = new Date(day);
          startTime.setHours(hour, minute, 0, 0);

          const endTime = new Date(startTime);
          endTime.setMinutes(endTime.getMinutes() + serviceDuration);

          const available = Math.random() > 0.3;

          slots.push({
            id: `slot-${hour}-${minute}`,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            available,
          });
        }
      }
      return slots;
    };

    setAvailableTimeSlots(generateMockTimeSlots());
    setPage(0);
  }, [date, serviceDuration]);

  useEffect(() => {
    const start = page * slotsPerPage;
    setVisibleTimeSlots(availableTimeSlots.slice(start, start + slotsPerPage));
  }, [page, availableTimeSlots]);

  const canGoNext = (page + 1) * slotsPerPage < availableTimeSlots.length;
  const canGoPrevious = page > 0;

  const formatTimeSlot = (isoString) => format(new Date(isoString), "h:mm a");

  const handleTimeSlotSelect = (timeSlot) => {
    if (!timeSlot.available || !date) return;
    onTimeSlotSelect(date, timeSlot);
  };

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Typography variant="subtitle1" gutterBottom>
          Select Date
        </Typography>
        <DatePicker
          value={date}
          onChange={(newDate) => setDate(newDate)}
          renderInput={(params) => <TextField {...params} fullWidth size="small" />}
          disablePast
        />
      </LocalizationProvider>

      {date && (
        <Box mt={3} p={2} border={1} borderColor="divider" borderRadius={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="subtitle2" display="flex" alignItems="center">
              <AccessTime fontSize="small" sx={{ mr: 1 }} /> Available Time Slots
            </Typography>
            <Box>
              <IconButton onClick={() => setPage((p) => p - 1)} disabled={!canGoPrevious}>
                <ChevronLeft />
              </IconButton>
              <IconButton onClick={() => setPage((p) => p + 1)} disabled={!canGoNext}>
                <ChevronRight />
              </IconButton>
            </Box>
          </Box>

          {visibleTimeSlots.length > 0 ? (
            <Grid container spacing={2}>
              {visibleTimeSlots.map((timeSlot) => {
                const isSelected = selectedTimeSlot?.id === timeSlot.id;
                return (
                  <Grid item xs={6} sm={4} key={timeSlot.id}>
                    <Button
                      fullWidth
                      variant={isSelected ? "contained" : "outlined"}
                      color={timeSlot.available ? "primary" : "inherit"}
                      onClick={() => handleTimeSlotSelect(timeSlot)}
                      disabled={!timeSlot.available}
                    >
                      {formatTimeSlot(timeSlot.startTime)}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Typography variant="body2" color="text.secondary" align="center" py={4}>
              No available slots for this date.
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default AvailabilityCalendar;