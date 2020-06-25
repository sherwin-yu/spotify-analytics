import React, { Component } from 'react';
import axios from 'axios';
import SpotifyIcon from '../common/SpotifyIcon';
import User from './User';
import UserCount from './UserCount';
import TopArtistsAndTracks from './TopArtistsAndTracks';
import TopGenres from './TopGenres';

class HomeContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userInfo: { followers: { total: 0 }, playlistCount: 0, followingCount: 0 },
      topArtists: { items: [] },
      topTracks: { items: [] },
      genres: [],
      audioFeatures: []
    };
  }

  async componentDidMount() {
    const { data: userInfo } = await axios.get('/api/spotify/me');
    const { data: topArtists } = await axios.get('/api/spotify/me/artists?limit=5&time_range=short_term');
    const { data: topTracks } = await axios.get('/api/spotify/me/tracks?limit=5&time_range=short_term');
    const { data: genres } = await axios.get('/api/spotify/me/genres');
    const { data: audioFeatures } = await axios.get('/api/spotify/me/tracks/audio-features');
    this.setState({ userInfo, topArtists, topTracks, genres, audioFeatures });
  }

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value }); // eslint-disable-line react/no-unused-state
    // eslint-disable-next-line no-console
    console.log('name', `${name}: ${value}`);
  };

  handleSubmit = event => {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log('SUBMITING', this.state);
  };

  render() {
    const { userInfo, topArtists, topTracks, genres } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-12">
            <SpotifyIcon />
            <User userInfo={userInfo} />
            <UserCount userInfo={userInfo} />
            <TopArtistsAndTracks topArtists={topArtists} topTracks={topTracks} handleChange={this.handleChange} />
            <TopGenres genres={genres} />
          </div>
        </div>
      </div>
    );
  }
}

export default HomeContainer;
