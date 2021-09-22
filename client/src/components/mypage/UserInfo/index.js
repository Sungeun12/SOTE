import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import styled from 'styled-components';
import color from '../../../util/style/color';

function UserInfo({ setModifyPW, image, name, email, major }) {
  return (
    <Container>
      <ImageWrapper>
        {image ? (
          <UserImg src={image} alt="프로필사진" />
        ) : (
          <FaUserCircle size="80" color="#838383" style={{ marginBottom: '2vh' }} />
        )}
        <Button type="button" bg="#213E70">
          이미지 업로드
        </Button>
        <Button type="button" color="#213E70">
          이미지 삭제
        </Button>
      </ImageWrapper>
      <UserInfoWrapper>
        <UserName>{name}</UserName>
        <Text>{email}</Text>
        <Text>{major}</Text>
        <Button type="button" color="#838383" onClick={() => setModifyPW(true)}>
          비밀번호 수정
        </Button>
      </UserInfoWrapper>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
`;
const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid ${color.middleGray};
  padding-right: 5vw;
`;
const UserImg = styled.img`
  border-radius: 50%;
  width: 40px;
`;
const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 5vw;
`;
const UserName = styled.div`
  font-family: 'Nanum Gothic Coding', monospace;
  font-size: 1.5rem;
  margin-bottom: 2vh;
  font-weight: bold;
`;
const Text = styled.div`
  font-size: 1rem;
  margin-bottom: 2vh;
`;
const Button = styled.button`
  font-family: 'Nanum Gothic Coding', monospace;
  height: 5vh;
  width: 130px;
  padding: 0 10px;
  margin-bottom: 2vh;
  text-align: center;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  background-color: ${props => props.bg || 'white'};
  color: ${props => props.color || 'white'};
  border: 1px solid ${props => props.color || 'none'};
  border-radius: 5px;
`;
export default UserInfo;
