import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { ArrowLeft, Calendar, CheckCircle, Clock, User } from "lucide-react";
import { Button, Divider } from "@mui/material";
import Footer from "../../components/Reservations/layout/Footer";
import Navbar from "../../components/Reservations/layout/Navbar";

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  useEffect(() => {
    if (!booking) {
      navigate("/booking");
    }
  }, [booking, navigate]);

  if (!booking) return null;

  const formatDate = (isoString) =>
    format(new Date(isoString), "EEEE, MMMM d, yyyy");
  const formatTime = (isoString) =>
    format(new Date(isoString), "h:mm a");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/> 

      <section className="pt-24 pb-16 sm:pt-32 sm:pb-24 flex-1 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border overflow-hidden"
          >
            {/* Success Icon */}
            <div className="pt-8 px-6 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="mt-4 text-2xl font-bold">Booking Confirmed!</h1>
              <p className="mt-2 text-muted-foreground">
                Your reservation has been successfully booked. A confirmation email has been sent to your email address.
              </p>
            </div>

            {/* Reservation Details */}
            <div className="mt-6 p-6">
              <h2 className="text-lg font-medium mb-4">Reservation Details</h2>
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Service & Date</h3>
                      <p className="text-sm">{booking.serviceName}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(booking.date)}</p>
                    </div>
                  </div>

                  <Divider />

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Time</h3>
                      <p className="text-sm">
                        {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                      </p>
                    </div>
                  </div>

                  <Divider />

                  <div className="flex items-start">
                    <User className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Patient Information</h3>
                      <p className="text-sm">{booking.patientName}</p>
                      <p className="text-sm text-muted-foreground">{booking.patientEmail}</p>
                      <p className="text-sm text-muted-foreground">{booking.patientPhone}</p>
                    </div>
                  </div>

                  {booking.notes && (
                    <>
                      <Divider />
                      <div>
                        <h3 className="font-medium">Additional Notes</h3>
                        <p className="text-sm mt-1">{booking.notes}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Booking ID */}
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Booking Reference:{" "}
                  <span className="font-medium">{booking.id || "REF-12345"}</span>
                </p>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outlined"
                  component={Link}
                  to="/dashboard"
                  fullWidth
                  startIcon={<ArrowLeft />}
                >
                  Go to Dashboard
                </Button>
                <Button
                  variant="contained"
                  component={Link}
                  to="/"
                  fullWidth
                >
                  Return to Home
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-2 p-6 bg-muted/20 border-t">
              <h3 className="text-sm font-medium mb-2">Important Information</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Please arrive 15 minutes before your scheduled appointment.</li>
                <li>• Bring any relevant medical records or documentation.</li>
                <li>• You can modify or cancel your reservation up to 24 hours before the appointment.</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Confirmation;
