import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
  font-size: 28px;
`;

const ListItem = styled.li`
  font-size: 24px;
  a {
    text-decoration: none;
    color: white;
    &:hover {
      text-decoration: underline;
      color: #1ed760;
    }
  }
`;

const TopArtistsAndTracks = ({ topArtists, topTracks }) => (
  <div className="row">
    <div className="col-md-6">
      <Title>Top Artists</Title>
      <ol>
        {topArtists.items.map(artist => (
          <ListItem key={artist.id}>{artist.name}</ListItem>
        ))}
      </ol>
    </div>
    <div className="col-md-6">
      <Title>Top Tracks</Title>
      <ol>
        {topTracks.items.map(track => (
          <ListItem key={track.id}>
            <a href={track.external_urls.spotify}>{track.name}</a>
            <ul>
              {track.artists &&
                track.artists.map(artist => (
                  <a key={artist.id} href={artist.external_urls.spotify} target="_blank">
                    <li>{artist.name}</li>
                  </a>
                ))}
            </ul>
          </ListItem>
        ))}
      </ol>
    </div>
  </div>
);

export default TopArtistsAndTracks;
