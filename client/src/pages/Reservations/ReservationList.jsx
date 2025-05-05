// pages/ReservationList.jsx
import React from 'react';
import ReservationCard from '../components/ReservationCard';
import useReservations from '../hooks/useReservations';
import { Box } from '@mui/material';

const ReservationList = () => {
  const { reservations, deleteReservation } = useReservations();

  return (
    <Box display="flex" flexDirection="column" gap={2} p={2}>
      {reservations.map(res => (
        <ReservationCard
          key={res._id}
          reservation={res}
          onDelete={deleteReservation}
        />
      ))}
    </Box>
  );
};

export default ReservationList;
