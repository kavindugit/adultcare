// models/notificationModel.js
import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  senderId: {
    type: String, // Admin userId
    required: true,
  },
  recipientId: {
    type: String, // Receiver userId
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String, // Email, SMS, Both
    required: true,
  },
  status: {
    type: String,
    default: 'Sent', // Or 'Failed'
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const NotificationModel = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
export default NotificationModel;
