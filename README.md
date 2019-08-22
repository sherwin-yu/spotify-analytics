# Spotify Analytics

## **Setup**

1. Create an `.env` file with the following variables and include in the root of the app
   - CLIENT_ID=[FROM SPOTIFY DEV DASHBOARD]
   - CLIENT_SECRET=[FROM SPOTIFY DEV DASHBOARD]
   - REDIRECT_URI=[PATH AFTER SPOTIFY LOGIN]
2. Install [Node 8.0.0 or greater](https://nodejs.org)
3. `npm install` to install the app's dependencies
4. `npm run dev` to start the webpack dev server on port `3002` and the express server on port `3001`
