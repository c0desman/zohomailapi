1.1. Create a Zoho Mail Account
Make sure orders@halalfood.live is a valid account in Zoho Mail (preferably via Zoho Workplace).

1.2. Register Your Application on Zoho API Console
Go to: https://api-console.zoho.com
Click Add Client → Choose Server-based Applications.
Fill out the form:
Client Name: HalalFoodMailAPI
Homepage URL: https://halalfood.live
Authorized Redirect URIs: http://localhost:3000/zoho/callback (or production one)
Submit → You’ll get:
Client ID
Client Secret

1.3. Generate Authorization Code (One-time manual step)
Paste this URL in your browser (replace client_id and redirect_uri):
https://accounts.zoho.com/oauth/v2/auth?scope=ZohoMail.messages.CREATE,ZohoMail.accounts.READ&client_id=YOUR_CLIENT_ID&response_type=code&access_type=offline&redirect_uri=http://localhost:3000/zoho/callback
It will ask you to log in with orders@halalfood.live and approve. It will redirect to your redirect_uri with ?code=AUTHORIZATION_CODE.

1.4. Exchange Authorization Code for Access Token + Refresh Token
Make a POST request:
curl --request POST \
  --url 'https://accounts.zoho.com/oauth/v2/token' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data 'grant_type=authorization_code&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&redirect_uri=http://localhost:3000/zoho/callback&code=AUTHORIZATION_CODE'
It returns:
{
  "access_token": "xyz...",
  "refresh_token": "abc...",
  "expires_in": 3600,
  "token_type": "Bearer"
}
✅ Store the refresh_token securely. You’ll use it to get new access_tokens every hour.

1.4. Get the account_id
You must know your Zoho account ID. You can find it easily by:
curl --request GET \
  --url 'https://mail.zoho.com/api/accounts' \
  --header 'Authorization: Zoho-oauthtoken YOUR_ACCESS_TOKEN'

✅ Response will look like:
{
  "data": [
    {
      "accountId": "1234567890",
      "emailAddress": "orders@halalfood.live",
      ...
    }
  ]
}

Take the accountId value → put it inside .env as ZOHO_ACCOUNT_ID.

After you have entered all the field of .env Now you can run the project with:
Insure .env file
Rename zoho-token.json.example to zoho-token.json
then Run in terminal in the project directory:
-> npm i
-> node server.js

To check Here is the CURL Link:
curl --location --request POST 'http://localhost:3000/send-email' \
--header 'Content-Type: application/json' \
--data-raw '{
  "to": "someone@example.com",
  "subject": "Test via API",
  "text": "Hello from Zoho Mail API!",
  "html": "<h1>Hello from Zoho API</h1>"
}'