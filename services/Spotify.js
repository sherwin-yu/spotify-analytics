require('dotenv').config();
const rp = require('request-promise');

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

const getToken = code =>
  rp({
    method: 'POST',
    uri: `https://accounts.spotify.com/api/token`,
    headers: {
      Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
    },
    form: {
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI
    },
    json: true
  });

const getRefreshToken = refreshToken =>
  rp({
    method: 'GET',
    uri: `https://accounts.spotify.com/api/token`,
    headers: {
      Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    },
    json: true
  });

const getUser = token =>
  rp({
    method: 'GET',
    uri: `https://api.spotify.com/v1/me`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    json: true
  });

const getUserPlaylists = (token, userId, limit = 50) =>
  rp({
    method: 'GET',
    uri: `https://api.spotify.com/v1/users/${userId}/playlists?limit=${limit}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    json: true
  });

const getUserFollowing = (token, limit = 50) =>
  rp({
    method: 'GET',
    uri: `https://api.spotify.com/v1/me/following?type=artist&limit=${limit}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    json: true
  });

const getUserTopArtists = (token, limit = 20, timeRange = 'short_term') =>
  rp({
    method: 'GET',
    uri: `https://api.spotify.com/v1/me/top/artists?limit=${limit}&time_range=${timeRange}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    json: true
  });

const getUserTopTracks = (token, limit = 20, timeRange = 'short_term') =>
  rp({
    method: 'GET',
    uri: `https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=${timeRange}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    json: true
  });

const getUserTrackAudioFeatures = (token, trackIds) =>
  rp({
    method: 'GET',
    uri: `https://api.spotify.com/v1/audio-features?ids=${trackIds}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    json: true
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
