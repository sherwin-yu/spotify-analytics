import axios from 'axios';

export const getSpotifyUser = () => axios.get('/api/spotify/me');
export const getTopArtists = timeRange => axios.get(`/api/spotify/me/artists?limit=5&time_range=${timeRange}`);
export const getTopTracks = timeRange => axios.get(`/api/spotify/me/tracks?limit=5&time_range=${timeRange}`);
export const getGenres = () => axios.get('/api/spotify/me/genres');
export const getAudioFeatures = () => axios.get('/api/spotify/me/tracks/audio-features');
