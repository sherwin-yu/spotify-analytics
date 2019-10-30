import React from 'react';
import styled from 'styled-components';

const ImageWrapper = styled.div`
  text-align: center;
  word-break: break-all;
`;
const StyledUserImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 2px solid #1ed760;
  display: block;
  margin: 0 auto;
`;

const ProfileImage = ({ src, alt, onError }) => (
  <ImageWrapper>
    <StyledUserImage src={src} alt={alt} onError={onError} />
  </ImageWrapper>
);

export default ProfileImage;
