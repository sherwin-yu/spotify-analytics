import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
  font-size: 28px;
  font-weight: 600;
`;

const ListItem = styled.li`
  font-size: 24px;
  a {
    text-decoration: none;
    color: #fff;
    &:hover {
      text-decoration: underline;
      color: #fff;
    }
  }
`;

const UnorderedList = styled.ul`
  padding: 0;
  font-size: 16px;
  color: #b3b3b3;
`;

const SubListItem = styled.li`
  font-size: 16px;
  list-style-type: none;
  display: inline;
  a {
    color: #b3b3b3;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
      color: #fff;
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
      <Title>Top Songs</Title>
      <ol>
        {topTracks.items.map(track => (
          <ListItem key={track.id}>
            <a href={track.external_urls.spotify}>{track.name}</a>
            <UnorderedList>
              {track.artists &&
                track.artists.map((artist, index) => (
                  <div key={artist.id}>
                    <SubListItem>
                      <a href={artist.external_urls.spotify} target="_blank">
                        {artist.name}
                      </a>
                    </SubListItem>
                    {index < track.artists.length - 1 ? ',\u00A0' : ''}
                  </div>
                ))}
            </UnorderedList>
          </ListItem>
        ))}
      </ol>
    </div>
  </div>
);

export default TopArtistsAndTracks;
