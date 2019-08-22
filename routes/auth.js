const express = require('express');
const Spotify = require('../services/Spotify');

const { CLIENT_ID, REDIRECT_URI } = process.env;

const router = express.Router();

const spotifyLogin = (req, res) => {
  const scopes = 'user-read-private user-read-email';
  res.redirect(
    `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(
      scopes
    )}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`
  );
};

const spotifyCallback = (req, res) => {
  const { code } = req.query;
  return Spotify.getToken(code).then(token => res.json(token));
};

router.get('/auth/login', spotifyLogin);
router.get('/auth/callback', spotifyCallback);

module.exports = router;
