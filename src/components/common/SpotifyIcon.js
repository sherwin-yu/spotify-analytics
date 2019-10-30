import React from 'react';
import styled from 'styled-components';
import spotify from '../../assets/spotify.svg';

const StyledImage = styled.img`
  width: 60px;
  height: 60px;
  margin: 20px 0px;
`;

const SpotifyIcon = () => <StyledImage src={spotify} alt="spotifyIcon" />;

export default SpotifyIcon;
