const { CLIENT_ID, REDIRECT_URI } = process.env;

const express = require('express');

const router = express.Router();

const spotifyLogin = (req, res) => {
  // your application requests authorization
  const scopes = 'user-read-private user-read-email';
  res.redirect(
    `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(
      scopes
    )}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`
  );
};

router.get('/auth/login', spotifyLogin);

module.exports = router;
