const express = require('express');
const Spotify = require('../services/Spotify');
const errorHandler = require('../utils/errorHandler');

const router = express.Router();

const getUser = (req, res) =>
  Spotify.getUser()
    .then(user => res.json(user))
    .catch(err => errorHandler(err, getUser.name, res));

router.get('/api/spotify/me', getUser);

module.exports = router;
