import { useState } from "react";
import { format } from "date-fns";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Chip
} from "@mui/material";
import { CalendarToday, AccessTime, Edit, MoreVert, Delete, Person } from "@mui/icons-material";
// import { toast } from "sonner";

const ReservationCard = ({ reservation, onUpdate, onDelete }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const getStatusChip = (status) => {
    const chipProps = {
      pending: { label: "Pending", color: "warning" },
      confirmed: { label: "Confirmed", color: "success" },
      completed: { label: "Completed", color: "primary" },
      cancelled: { label: "Cancelled", color: "error" },
    };
    return <Chip label={chipProps[status]?.label || status} color={chipProps[status]?.color || "default"} variant="outlined" size="small" />;
  };

  const formatDate = (isoString) => format(new Date(isoString), "EEEE, MMMM d, yyyy");
  const formatTime = (isoString) => format(new Date(isoString), "h:mm a");

  const handleDelete = () => {
    if (onDelete) {
      onDelete(reservation.id);
      setIsDeleteDialogOpen(false);
      toast.success("Reservation cancelled successfully");
    }
  };

  const borderLeftColor = {
    pending: "4px solid #facc15",
    confirmed: "4px solid #4ade80",
    completed: "4px solid #60a5fa",
    cancelled: "4px solid #f87171",
  }[reservation.status] || "4px solid transparent";

  return (
    <Card sx={{ transition: "0.3s", '&:hover': { boxShadow: 6 }, borderLeft: borderLeftColor }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Typography fontWeight={600}>{reservation.serviceName}</Typography>
            <Box display="flex" alignItems="center" gap={1} mt={0.5} color="text.secondary" fontSize={14}>
              <CalendarToday fontSize="small" />
              {formatDate(reservation.sessionDate)}
              <AccessTime fontSize="small" />
              {reservation.sessionTime}
            </Box>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            {getStatusChip(reservation.status)}
            <IconButton size="small" onClick={handleMenuOpen}>
              <MoreVert fontSize="small" />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={() => toast.info("Edit functionality coming soon")}><Edit fontSize="small" sx={{ mr: 1 }} /> Edit</MenuItem>
              <MenuItem onClick={() => { 
                setIsDeleteDialogOpen(true);
                 handleMenuClose();
                  }} sx={{ color: 'error.main' }}><Delete fontSize="small" sx={{ mr: 1 }} /> Cancel</MenuItem>
            </Menu>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" alignItems="center" gap={1}>
          <Person fontSize="small" />
          <Typography variant="body2"><strong>{reservation.patientName}</strong> — {reservation.patientEmail}</Typography>
        </Box>

        {reservation.notes && (
          <Typography variant="body2" color="text.secondary" mt={1}>
            {reservation.notes}
          </Typography>
        )}
      </CardContent>

      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogTitle>Cancel Reservation</DialogTitle>
        <DialogContent>
          <Typography variant="body2">Are you sure you want to cancel this reservation? This action cannot be undone.</Typography>
          <Box mt={2} bgcolor="#f9fafb" p={2} borderRadius={1}>
            <Typography variant="body2"><strong>Service:</strong> {reservation.serviceName}</Typography>
            <Typography variant="body2"><strong>Date:</strong> {formatDate(reservation.sessionDate)}</Typography>
            <Typography variant="body2"><strong>Time:</strong> {reservation.sessionTime}</Typography>
            <Typography variant="body2"><strong>Patient:</strong> {reservation.patientName}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)} variant="outlined">Keep Reservation</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Yes, Cancel</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ReservationCard;