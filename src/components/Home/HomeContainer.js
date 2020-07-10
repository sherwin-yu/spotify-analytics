import React, { useState, useEffect } from 'react';
import SpotifyIcon from '../common/SpotifyIcon';
import User from './User';
import UserCount from './UserCount';
import TopArtistsAndTracks from './TopArtistsAndTracks';
import TopGenres from './TopGenres';
import { getSpotifyUser, getTopArtists, getTopTracks, getGenres, getAudioFeatures } from '../../api/spotify';

function HomeContainer() {
  const [userInfo, setUserInfo] = useState({ followers: { total: 0 }, playlistCount: 0, followingCount: 0 });
  const [topArtists, setTopArtists] = useState({ items: [] });
  const [topTracks, setTopTracks] = useState({ items: [] });
  const [genres, setGenres] = useState([]);
  // const [audioFeatures, setAudioFeatures] = useState([]);

  useEffect(() => {
    async function initialLoad() {
      try {
        const { data: userInfoData } = await getSpotifyUser();
        const { data: topArtistsData } = await getTopArtists('short_term');
        const { data: topTracksData } = await getTopTracks('short_term');
        const { data: genresData } = await getGenres();
        // const { data: audioFeaturesData } = await getAudioFeatures();
        setUserInfo(userInfoData);
        setTopArtists(topArtistsData);
        setTopTracks(topTracksData);
        setGenres(genresData);
        // setAudioFeatures(audioFeaturesData);
      } catch (err) {
        console.log('err', err);
      }
    }
    initialLoad();
  });

  async function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    console.log('name', `${name}: ${value}`);
    try {
      if (name === 'topArtists') {
        console.log('data');
        const { data } = await getTopArtists(value);
        console.log('data123', data);
      }
    } catch (err) {
      console.log('err', err);
    }

    console.log('name', `${name}: ${value}`);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12 col-md-12">
          <SpotifyIcon />
          <User userInfo={userInfo} />
          <UserCount userInfo={userInfo} />
          <TopArtistsAndTracks topArtists={topArtists} topTracks={topTracks} handleChange={handleChange} />
          <TopGenres genres={genres} />
        </div>
      </div>
    </div>
  );
}
// }

export default HomeContainer;
