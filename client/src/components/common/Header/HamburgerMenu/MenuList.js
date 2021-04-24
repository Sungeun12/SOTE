import React from 'react';
import styled from 'styled-components';
import TextMenu from '../TextMenu';
import Button from '../Button';
import UserProfile from '../UserProfile';

function MenuList() {
  const loginUser = false;
  return (
    <MenuListContainer>
      {loginUser ? (
        <div>
          <UserProfile />
        </div>
      ) : (
        <ButtonContainer>
          <Button link="/login" text="로그인" border="#213E70" fontcolor="#213E70" />
          <Button link="/signup" text="회원가입" background="#213E70" />
        </ButtonContainer>
      )}

      <Line />
      <TextMenu />
      <BottomContainer>
        {loginUser ? <Button text="로그아웃" border="#213E70" fontcolor="#213E70" /> : ''}
      </BottomContainer>
    </MenuListContainer>
  );
}

const MenuListContainer = styled.div`
  margin-top: 50px;
`;
const ButtonContainer = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  width: 85%;
`;
const Line = styled.div`
  margin: 20px 0 10px 0;
  width: 100%;
  border-bottom: 1px solid #e1e1e1;
`;
const BottomContainer = styled.div`
  position: absolute;
  bottom: 50px;
  right: 2rem;
`;
export default MenuList;
