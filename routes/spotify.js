const express = require('express');
const Spotify = require('../services/Spotify');
const errorHandler = require('../utils/errorHandler');

const router = express.Router();

const getUser = async (req, res) => {
  try {
    const user = await Spotify.getUser(req.cookies.spotify_access_token);
    const userPlaylists = await Spotify.getUserPlaylists(req.cookies.spotify_access_token, user.id);
    const userFollowing = await Spotify.getUserFollowing(req.cookies.spotify_access_token);

    return res.send({
      ...user,
      playlistCount: userPlaylists.total,
      followingCount: userFollowing.artists.total
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

const getUserTrackAudioFeatures = async (req, res) => {
  try {
    const topTracks = await Spotify.getUserTopTracks(req.cookies.spotify_access_token, 50);
    const trackIds = await topTracks.items.map(track => track.id).join();
    const { audio_features: audioFeaturesOfTracks } = await Spotify.getUserTrackAudioFeatures(
      req.cookies.spotify_access_token,
      trackIds
    );
    return res.send(audioFeaturesOfTracks);
  } catch (err) {
    return errorHandler(err, getUserTrackAudioFeatures.name, res);
  }
};

const getUserTopGenres = async (req, res) => {
  try {
    const { items: topArtists } = await Spotify.getUserTopArtists(req.cookies.spotify_access_token, 50);
    const genres = topArtists.map(topArtist => topArtist.genres);
    const allGenres = await [].concat(...genres);
    const allGenresCount = Object.values(
      allGenres.reduce((acc, currentValue) => {
        acc[currentValue] = acc[currentValue] || [currentValue, 0];
        // eslint-disable-next-line
        acc[currentValue][1]++;
        return acc;
      }, {})
    ).map(genre => ({ id: genre[0], value: genre[1] }));
    return res.send(allGenresCount);
  } catch (err) {
    return errorHandler(err, getUserTopGenres.name, res);
  }
};

router.get('/api/spotify/me', getUser);
router.get('/api/spotify/me/artists', getUserTopArtists);
router.get('/api/spotify/me/tracks', getUserTopTracks);
router.get('/api/spotify/me/genres', getUserTopGenres);
router.get('/api/spotify/me/tracks/audio-features', getUserTrackAudioFeatures);

module.exports = router;
