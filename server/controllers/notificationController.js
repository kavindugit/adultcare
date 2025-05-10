// controllers/notificationController.js
import transporter from '../config/nodemaler.js';
import sendSMS from '../config/smsService.js';
import userModel from '../models/userModel.js';
import NotificationModel from '../models/notificationModel.js';



export const sendNotification = async (req, res) => {
  const { recipients, message, type, senderId } = req.body;

  if (!recipients || !Array.isArray(recipients) || recipients.length === 0 || !message || !type || !senderId) {
    return res.status(400).json({ success: false, message: 'Missing or invalid required fields' });
  }

  try {
    const users = await userModel.find({ userId: { $in: recipients } });

    if (!users.length) {
      return res.status(404).json({ success: false, message: 'No users found for given userIds' });
    }

    for (const user of users) {
      const { userId, fullName, email, phoneNo } = user;
      let status = 'Sent';

      try {
        // Email Notification
        if (type === 'Email' || type === 'Both') {
          if (email) {
            const mailOptions = {
              from: process.env.SENDER_EMAIL,
              to: email,
              subject: 'Notification from Elder Bliss',
              text: `Hello ${fullName || 'User'},\n\n${message}\n\n- Elder Bliss Team`,
            };
            await transporter.sendMail(mailOptions);
          }
        }

        // SMS Notification
        if (type === 'SMS' || type === 'Both') {
          if (phoneNo && phoneNo.startsWith('+')) {
            await sendSMS(phoneNo, message);
          }
        }
      } catch (sendErr) {
        status = 'Failed';
        console.error(`Failed to send notification to ${userId}:`, sendErr.message);
      }

      // Save notification log in DB
      await NotificationModel.create({
        senderId,
        recipientId: userId,
        message,
        type,
        status,
      });
    }

    return res.status(200).json({ success: true, message: 'Notifications sent and stored' });
  } catch (error) {
    console.error('Error in sendNotification:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};


export const getNotifications = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    const notifications = await NotificationModel.find({ recipientId: userId }).sort({ timestamp: -1 });

    return res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error('Error in getNotifications:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

export const getallNotifications = async (req, res) => {
  try {
    const notifications = await NotificationModel.find({}).sort({ timestamp: -1 });

    const enriched = await Promise.all(
      notifications.map(async (n) => {
        const sender = await userModel.findOne({ userId: n.senderId });
        const recipient = await userModel.findOne({ userId: n.recipientId });

        return {
          _id: n._id,
          senderId: n.senderId,
          senderName: sender ? sender.fullName : "Unknown",
          recipientId: n.recipientId,
          recipientNames: recipient ? [recipient.fullName] : ["Unknown"],
          message: n.message,
          type: n.type,
          status: n.status,
          timestamp: n.timestamp,
        };
      })
    );

    return res.status(200).json({ success: true, notifications: enriched });
  } catch (error) {
    console.error("Error in getallNotifications:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteAllNotifications = async (req, res) => {
  try {
    // Delete all documents in the Notification collection
    const result = await NotificationModel.deleteMany({});

    // Check if any documents were deleted
    if (result.deletedCount === 0) {
      return res.status(200).json({
        success: true,
        message: 'No notifications found to delete',
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'All notification history deleted successfully',
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error('Error deleting notification history:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete notification history',
      error: error.message,
    });
  }
};