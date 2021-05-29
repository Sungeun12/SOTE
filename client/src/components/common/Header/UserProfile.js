import React from 'react';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

function UserProfile() {
  const loginUser = useSelector(state => state.user.user);
  const profilePath = false;

  return (
    <UserContainer>
      {loginUser && (
        // eslint-disable-next-line no-underscore-dangle
        <UserItem key={loginUser._id}>
          <UserName>{loginUser.name}</UserName>
          {profilePath ? (
            <UserImg src={profilePath} alt="프로필사진" />
          ) : (
            <FaUserCircle size="25" color="#696868" />
          )}
        </UserItem>
      )}
    </UserContainer>
  );
}

const UserContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 1rem;
`;
const UserItem = styled.div`
  display: flex;
  align-items: center;
`;
const UserImg = styled.img`
  border-radius: 50%;
  width: 40px;
`;
const UserName = styled.div`
  font-family: 'Nanum Gothic Coding', monospace;
  font-size: 13px;
  margin-right: 0.6rem;
`;
export default UserProfile;
