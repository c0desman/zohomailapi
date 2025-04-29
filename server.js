const express = require('express');
const { sendEmail } = require('./services/emailService');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/send-email', async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;
    const response = await sendEmail({ to, subject, text, html });
    res.json({ message: '✅ Email sent successfully', response });
  } catch (error) {
    console.error('❌ Error sending email:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));