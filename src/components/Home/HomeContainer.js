import React, { Component } from 'react';
import User from './User';
import UserCount from './UserCount';
import TopArtistsAndTracks from './TopArtistsAndTracks';
import TopGenres from './TopGenres';

class HomeContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      userInfo: { followers: { total: 0 }, playlistCount: 0, followingCount: 0 },
      topArtists: { items: [] },
      topTracks: { items: [] },
      genres: []
    };
  }

  componentDidMount() {
    fetch('/api/spotify/me')
      .then(res => res.json())
      .then(userInfo => {
        this.setState({ userInfo });
        console.log('userInfo', userInfo);
      });
    fetch('/api/spotify/me/artists?limit=5&time_range=short_term')
      .then(res => res.json())
      .then(topArtists => {
        this.setState({ topArtists });
        console.log('topartists', topArtists);
      });
    fetch('/api/spotify/me/tracks?limit=5&time_range=short_term')
      .then(res => res.json())
      .then(topTracks => {
        this.setState({ topTracks });
        console.log('topTracks', topTracks);
      });
    fetch('/api/spotify/me/genres')
      .then(res => res.json())
      .then(genres => {
        this.setState({ genres });
        console.log('genres', genres);
      });
  }

  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value }); // eslint-disable-line react/no-unused-state
    console.log('name', `${name}: ${value}`);
    if (name === 'trackTimeRange') {
      fetch(`/api/spotify/me/tracks?limit=5&time_range=${value}`)
        .then(res => res.json())
        .then(topArtists => {
          console.log('topartists', topArtists);
          this.setState({ topArtists });
        });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log('SUBMITING', this.state);
  }

  render() {
    const { userInfo, topArtists, topTracks, genres } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div style={{ fontSize: '28px', fontWeight: '600', marginBottom: '25px' }}>Spotify Analytics</div>
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
