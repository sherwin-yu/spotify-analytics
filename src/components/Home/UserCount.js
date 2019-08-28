import React from 'react';
import styled from 'styled-components';

const CountWrapper = styled.div`
  text-align: center;
  font-size: 18px;
`;

const UserCount = ({ userInfo }) => (
  <div className="col-md-6 offset-md-3">
    <div className="row">
      <div className="col-md-4">
        <CountWrapper>{userInfo.playlistCount} Playlists</CountWrapper>
      </div>
      <div className="col-md-4">
        <CountWrapper>{userInfo.followingCount} Following</CountWrapper>
      </div>
      <div className="col-md-4">
        <CountWrapper>{userInfo.followers.total} Followers</CountWrapper>
      </div>
    </div>
  </div>
);

export default UserCount;
