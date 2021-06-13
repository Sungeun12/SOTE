import React from 'react';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';
import color from '../../../../util/style/color';

function MemberItem({ name, profile }) {
  return (
    <Container>
      <UserWrapper>
        {profile ? (
          <Img src={profile} alt="멤버 사진" />
        ) : (
          <FaUserCircle size="30" color="#696868" style={{ marginRight: '50px' }} />
        )}

        <div>{name}</div>
      </UserWrapper>
      <Button type="button">강퇴하기</Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  justify-content: space-between;
  border: 1px solid ${color.middleGray};
  padding: 2vh 2vw;
`;
const UserWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Img = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 50px;
`;
const Button = styled.button`
  cursor: pointer;
  background-color: #dd4b19;
  border: none;
  width: 100px;
  height: 30px;
  color: white;
  border-radius: 5px;
  font-family: 'Nanum Gothic Coding', monospace;
  font-size: 0.8rem;
`;
export default MemberItem;
