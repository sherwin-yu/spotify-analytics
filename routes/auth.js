const express = require('express');
const Spotify = require('../services/Spotify');

const { CLIENT_ID, REDIRECT_URI, BASE_PATH } = process.env;

const router = express.Router();

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */

const generateRandomString = length => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const mismatchState = (req, res) => res.status(500).send('Mismatched State for Auth');

const spotifyLogin = (req, res) => {
  const state = generateRandomString(16);
  res.cookie('spotify_auth_state', state);
  const scopes = 'user-read-private user-read-email user-top-read';
  res.redirect(
    `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(
      scopes
    )}&state=${state}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`
  );
};

const spotifyCallback = async (req, res) => {
  const { code, state } = req.query;
  if (!state || state !== req.cookies.spotify_auth_state) {
    console.log('mismatch state');
    return mismatchState();
  }
  res.clearCookie('spotify_auth_state');
  const token = await Spotify.getToken(code);
  res.cookie('spotify_access_token', token.access_token);
  return res.redirect(BASE_PATH);
};

const spotifyRefreshToken = (req, res) => {
  const { refresh_token } = req.query;
  return Spotify.getRefreshToken(refresh_token)
    .then(token => {
      req.userToken = token;
      return res.redirect(BASE_PATH);
    })
    .catch(err => err);
};

router.get('/auth/login', spotifyLogin);
router.get('/auth/callback', spotifyCallback);
router.get('/auth/refreshToken', spotifyRefreshToken);

module.exports = router;
