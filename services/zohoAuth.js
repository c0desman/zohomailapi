const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

const tokenFile = './zoho-token.json';

async function getAccessToken() {
  const tokenData = JSON.parse(fs.readFileSync(tokenFile));

  if (tokenData.access_token && tokenData.expires_at > Date.now()) {
    return tokenData.access_token;
  }

  console.log('🔁 Refreshing Zoho access token...');
  const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', null, {
    params: {
      refresh_token: process.env.ZOHO_REFRESH_TOKEN,
      client_id: process.env.ZOHO_CLIENT_ID,
      client_secret: process.env.ZOHO_CLIENT_SECRET,
      redirect_uri: process.env.ZOHO_REDIRECT_URI,
      grant_type: 'refresh_token',
    },
  });

  const { access_token, expires_in } = response.data;

  const newTokenData = {
    access_token,
    expires_at: Date.now() + (expires_in - 300) * 1000 // Refresh 5 minutes before expiry
  };

  fs.writeFileSync(tokenFile, JSON.stringify(newTokenData, null, 2));
  console.log('✅ Zoho access token refreshed and saved.');

  return access_token;
}

module.exports = { getAccessToken };