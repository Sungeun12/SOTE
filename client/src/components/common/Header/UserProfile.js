import React from 'react';
import styled from 'styled-components';
import dummy from './dummyUser.json';

function UserProfile() {
  return (
    <UserContainer>
      {dummy.user &&
        dummy.user.map(({ id, name, profilePath }) => (
          <UserItem key={id.toString(10)}>
            <UserName>{name}</UserName>
            <UserImg src={profilePath} alt={id.toString(10)} />
          </UserItem>
        ))}
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
