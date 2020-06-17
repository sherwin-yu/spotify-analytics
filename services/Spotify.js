require('dotenv').config();
const axios = require('axios');

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

const getToken = code =>
  axios({
    method: 'POST',
    uri: `https://accounts.spotify.com/api/token`,
    headers: {
      Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
    },
    form: {
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI
    }
  });

const getRefreshToken = refreshToken =>
  axios({
    method: 'GET',
    url: `https://accounts.spotify.com/api/token`,
    headers: {
      Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }
  });

const getUser = token =>
  axios({
    method: 'GET',
    url: `https://api.spotify.com/v1/me`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

const getUserPlaylists = (token, userId, limit = 50) =>
  axios({
    method: 'GET',
    url: `https://api.spotify.com/v1/users/${userId}/playlists?limit=${limit}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

const getUserFollowing = (token, limit = 50) =>
  axios({
    method: 'GET',
    url: `https://api.spotify.com/v1/me/following?type=artist&limit=${limit}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

const getUserTopArtists = (token, limit = 20, timeRange = 'short_term') =>
  axios({
    method: 'GET',
    url: `https://api.spotify.com/v1/me/top/artists?limit=${limit}&time_range=${timeRange}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

const getUserTopTracks = (token, limit = 20, timeRange = 'short_term') =>
  axios({
    method: 'GET',
    url: `https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=${timeRange}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

const getUserTrackAudioFeatures = (token, trackIds) =>
  axios({
    method: 'GET',
    url: `https://api.spotify.com/v1/audio-features?ids=${trackIds}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

module.exports = {
  getToken,
  getRefreshToken,
  getUser,
  getUserPlaylists,
  getUserFollowing,
  getUserTopArtists,
  getUserTopTracks,
  getUserTrackAudioFeatures
};
