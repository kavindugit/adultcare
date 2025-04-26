import twilio from 'twilio';

// Load credentials from environment variables
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

// Create Twilio client
const client = new twilio(accountSid, authToken);

// Send SMS function
const sendSMS = async (to, message) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: twilioPhone,
      to, 
    });

    console.log(' SMS sent successfully. SID:', response.sid);
    return response;
  } catch (error) {
    console.error(' Failed to send SMS:', error.message);
    throw error;
  }
};

export default  sendSMS ;
