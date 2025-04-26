import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const chatWithBot = async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat-v3-0324:free", // ✅ Correct model ID from OpenRouter docs
        messages: [
          {
            role: "system",
            content: `
You are Elder Bliss, a virtual assistant in our adult care management system.

System Overview:
- Roles: Guardians, Adults, Employees (Doctors, Nurses), Admins.
- Guardians register and manage linked adults.
- Adults must be linked to guardians to access services.
- Admins manage users, employees, packages, and sessions.
- Available Care Packages: Basic, Premium, and Medical.
- Adults or guardians can book sessions (consultations, therapy, etc).
- Notifications are sent by admins to guardians or employees.

Your job:
- Help users understand the system and assist with questions.
- Guide on registering, viewing packages, or booking.
- Always stay within this system's context and do not make up data.
            `
          },
          {
            role: "user",
            content: message
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "Elder Bliss Chatbot"
        }
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Chatbot error:", error.response?.data || error.message);
    res.status(500).json({ reply: "Bot is currently unavailable." });
  }
};
