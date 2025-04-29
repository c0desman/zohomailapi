# 📬 Zoho Mail API Integration

Send emails programmatically using the Zoho Mail API (without SMTP) from a Node.js + Express backend. This project is configured to use **OAuth2.0** and supports **token persistence** for long-term use.

---

## 🔧 Features

- ✅ Send emails via Zoho Mail (orders@halalfood.live)
- ✅ Uses Zoho OAuth2.0 for secure API access
- ✅ Refreshes access tokens using saved `refresh_token`
- ✅ No SMTP used (DigitalOcean safe)
- ✅ Designed for production use with `.env` and `zoho-token.json`

---

## ⚙️ Step-by-Step Setup

### 1. Create a Zoho Mail Account
Ensure you have a working email like `orders@halalfood.live` created in **Zoho Mail** (via [Zoho Workplace](https://www.zoho.com/workplace/)).

---

### 2. Register Your Application

1. Visit the [Zoho API Console](https://api-console.zoho.com)
2. Click **Add Client** → Choose **Server-based Applications**
3. Fill in:
   - **Client Name:** `HalalFoodMailAPI`
   - **Homepage URL:** `https://halalfood.live`
   - **Authorized Redirect URI:** `http://localhost:3000/zoho/callback` *(or your production URL)*
4. Submit to get:
   - `CLIENT_ID`
   - `CLIENT_SECRET`

---

### 3. Generate Authorization Code (One-time)

Paste this into your browser (replace values):
https://accounts.zoho.com/oauth/v2/auth?scope=ZohoMail.messages.CREATE,ZohoMail.accounts.READ&client_id=YOUR_CLIENT_ID&response_type=code&access_type=offline&redirect_uri=http://localhost:3000/zoho/callback

- Log in with your `orders@halalfood.live` Zoho account
- Approve access
- You'll be redirected to your `redirect_uri` with `?code=AUTHORIZATION_CODE`

---

### 4. Exchange Authorization Code for Access & Refresh Tokens

Use `curl` or Postman:

curl --request POST \
  --url 'https://accounts.zoho.com/oauth/v2/token' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data 'grant_type=authorization_code&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&redirect_uri=http://localhost:3000/zoho/callback&code=AUTHORIZATION_CODE'

📌 Save the refresh_token securely. You'll need it to regenerate access tokens.

### 5. Get Your Zoho Mail Account ID
curl --request GET \
  --url 'https://mail.zoho.com/api/accounts' \
  --header 'Authorization: Zoho-oauthtoken YOUR_ACCESS_TOKEN'

Look for:
{
  "data": [
    {
      "accountId": "1234567890",
      "emailAddress": "orders@halalfood.live"
    }
  ]
}

Copy the accountId and store it in .env.

### 6. .env Setup and Run the Project
CLIENT_ID=your_zoho_client_id
CLIENT_SECRET=your_zoho_client_secret
REDIRECT_URI=http://localhost:3000/zoho/callback
REFRESH_TOKEN=your_saved_refresh_token
ZOHO_ACCOUNT_ID=your_account_id

# Install dependencies
npm install

# Rename the token example file
mv zoho-token.json.example zoho-token.json

# Start the server
node server.js

### 7. Send an Email
Use this cURL to test:
curl --location --request POST 'http://localhost:3000/send-email' \
--header 'Content-Type: application/json' \
--data-raw '{
  "to": "someone@example.com",
  "subject": "Test via API",
  "text": "Hello from Zoho Mail API!",
  "html": "Hello from Zoho API>"
}'

Or use Postman with the same POST request.

🛡 Security Notice
Never commit .env or zoho-token.json to GitHub. These contain sensitive credentials.

### 🙋‍♂️ Questions?
Feel free to open an issue or contact.
---

This `README.md` contains detailed setup instructions for your Zoho Mail API project. You can add it to your project