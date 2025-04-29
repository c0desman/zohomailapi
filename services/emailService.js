const axios = require('axios');
const { getAccessToken } = require('./zohoAuth');
require('dotenv').config();

async function sendEmail({ to, subject, text, html }) {
  const accessToken = await getAccessToken();

  const payload = {
    fromAddress: process.env.ZOHO_USER_EMAIL,
    toAddress: to,
    subject,
    content: html || text,
    mailFormat: html ? 'html' : 'text',
  };

  const response = await axios.post(
    `https://mail.zoho.com/api/accounts/${process.env.ZOHO_ACCOUNT_ID}/messages`,
    payload,
    {
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
}

module.exports = { sendEmail };