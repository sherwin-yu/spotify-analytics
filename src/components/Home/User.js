import React from 'react';
import styled from 'styled-components';
import ProfileImage from '../common/ProfileImage';

const UserName = styled.div`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  margin: 15px 0px;
  a {
    color: white;
    text-decoration: none;
  }
`;

const User = ({ userInfo }) => (
  <>
    <ProfileImage src={userInfo.images && userInfo.images[0].url} alt="profile_pic" />
    <UserName>
      <a href="https://open.spotify.com/user/1228291215" target="_blank">
        {userInfo.display_name}
      </a>
    </UserName>
  </>
);

export default User;
