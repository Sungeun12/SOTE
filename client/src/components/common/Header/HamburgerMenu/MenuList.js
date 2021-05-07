import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../../actions/auth_actions';
import TextMenu from '../TextMenu';
import Button from '../Button';
import UserProfile from '../UserProfile';
import color from '../../../../util/style/color';

function MenuList() {
  const loginUser = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log('logout');
    dispatch(logout());
  };
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
        {loginUser ? <LogoutButton type="button" value="로그아웃" onClick={handleLogout} /> : ''}
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
const LogoutButton = styled.input`
  font-family: 'Nanum Gothic Coding', monospace;
  width: 65px;
  height: 30px;
  text-align: center;
  background-color: white;
  padding: 8px 10px;
  border-radius: 30px;
  border: 1px solid ${color.navy};
  font-size: 10px;
  color: ${color.navy};
  cursor: pointer;
  opacity: 0.97;
  :hover {
    opacity: 1;
  }
`;
export default MenuList;
