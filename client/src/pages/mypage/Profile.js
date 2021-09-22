import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import media from '../../util/style/media';
import NavBar from '../../components/mypage/NavBar';
import { textData } from '../../components/mypage/NavBar/textData';
import ModifyPwForm from '../../components/mypage/ModifyPwForm';
import UserInfo from '../../components/mypage/UserInfo';

function Profile({ location }) {
  const [modifyPW, setModifyPW] = useState(false);
  const loginUser = useSelector(state => state.user.user);
  return (
    <Container>
      <NavBar data={textData} path={location.pathname} />
      {loginUser && modifyPW ? (
        // eslint-disable-next-line no-underscore-dangle
        <UserContainer>
          <ModifyPwForm setModifyPW={setModifyPW} />
        </UserContainer>
      ) : (
        <UserContainer>
          <UserInfo
            setModifyPW={setModifyPW}
            image={loginUser.image}
            name={loginUser.name}
            email={loginUser.email}
            major={loginUser.major}
          />
        </UserContainer>
      )}
    </Container>
  );
}
const Container = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  @media (max-width: ${media.tablet}px) {
    width: 90%;
  }
  margin: 13vh auto;
`;
const UserContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3vh auto;
  padding: 10vh 5vw;
  width: 80%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

export default Profile;
