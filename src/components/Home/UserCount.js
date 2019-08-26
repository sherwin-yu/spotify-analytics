import React from 'react';
import styled from 'styled-components';

const CountWrapper = styled.div`
  text-align: center;
  font-size: 18px;
`;

const UserCount = () => (
  <div className="col-md-8 offset-md-2">
    <div className="row">
      <div className="col-md-4">
        <CountWrapper>0 Playlists</CountWrapper>
      </div>
      <div className="col-md-4">
        <CountWrapper>0 Following</CountWrapper>
      </div>
      <div className="col-md-4">
        <CountWrapper>0 Followers</CountWrapper>
      </div>
    </div>
  </div>
);

export default UserCount;
