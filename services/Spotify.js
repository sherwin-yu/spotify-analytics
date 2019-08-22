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

const getUser = token =>
  rp({
    uri: `https://api.spotify.com/v1/me`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

module.exports = {
  getToken,
  getUser
};
