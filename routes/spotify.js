const express = require('express');
const Spotify = require('../services/Spotify');
const errorHandler = require('../utils/errorHandler');

const router = express.Router();

const getUser = async (req, res) => {
  try {
    const user = await Spotify.getUser(req.cookies.spotify_access_token);
    return res.send(user);
  } catch (err) {
    return errorHandler(err, getUser.name, res);
  }
};

router.get('/api/spotify/me', getUser);

module.exports = router;
