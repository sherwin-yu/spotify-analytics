const express = require('express');
const Spotify = require('../services/Spotify');
const errorHandler = require('../utils/errorHandler');

const router = express.Router();

const getUser = async (req, res) => {
  try {
    const user = await Spotify.getUser(req.cookies.spotify_access_token);
    const userPlaylists = await Spotify.getUserPlaylists(req.cookies.spotify_access_token, user.id);

    return res.send({
      ...user,
      playlistCount: userPlaylists.total
    });
  } catch (err) {
    return errorHandler(err, getUser.name, res);
  }
};

const getUserTopArtists = async (req, res) => {
  try {
    const topArtists = await Spotify.getUserTopArtists(req.cookies.spotify_access_token, req.query.limit);
    return res.send(topArtists);
  } catch (err) {
    return errorHandler(err, getUserTopArtists.name, res);
  }
};

const getUserTopTracks = async (req, res) => {
  try {
    const topTracks = await Spotify.getUserTopTracks(req.cookies.spotify_access_token, req.query.limit);
    return res.send(topTracks);
  } catch (err) {
    return errorHandler(err, getUserTopTracks.name, res);
  }
};

router.get('/api/spotify/me', getUser);
router.get('/api/spotify/me/artists', getUserTopArtists);
router.get('/api/spotify/me/tracks', getUserTopTracks);

module.exports = router;
