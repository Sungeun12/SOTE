import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import Logo from './Logo';
import HamburgerMenu from './HamburgerMenu';
import TextMenu from './TextMenu';
import media from '../../../util/style/media';
import Button from './Button';
import IconMenu from './IconMenu';
import UserProfile from './UserProfile';
import { logout } from '../../../actions/auth_actions';
import storage from '../../../util/storage';
import color from '../../../util/style/color';

function Header() {
  const loginUser = storage.get('user');
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setOpen(!isOpen);
  };
  const closeMenu = () => {
    setOpen(false);
  };
  const location = useLocation();

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  const handleLogout = () => {
    console.log('로그아웃');
    dispatch(logout());
  };

  return (
    <HeaderContainer>
      <MenuItem>
        <Logo closeMenu={closeMenu} />
        <LeftMenuContainer>
          <TextMenu />
        </LeftMenuContainer>
      </MenuItem>
      <MenuItem>
        {loginUser ? (
          <UserContainer>
            <UserProfile />
          </UserContainer>
        ) : (
          ''
        )}

        <IconMenu />
        <ButtonContainer>
          {loginUser ? (
            <LogoutButton type="button" value="로그아웃" onClick={handleLogout} />
          ) : (
            <Button link="/login" text="로그인" background="#213E70" />
          )}
        </ButtonContainer>

        <HamburgerMenu isOpen={isOpen} toggleMenu={toggleMenu} />
      </MenuItem>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06);
`;
const MenuItem = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  margin-left: 2rem;
`;
const LeftMenuContainer = styled.div`
  @media (max-width: ${media.tablet}px) {
    display: none;
  }
  display: block;
`;
const UserContainer = styled.div`
  @media (max-width: ${media.tablet}px) {
    display: none;
  }
`;

const ButtonContainer = styled.div`
  @media (max-width: ${media.tablet}px) {
    display: none;
    padding-right: 0;
  }
  padding-right: 2rem;
`;

const LogoutButton = styled.input`
  font-family: 'Nanum Gothic Coding', monospace;
  width: 65px;
  height: 30px;
  text-align: center;
  background-color: ${color.navy};
  padding: 8px 10px;
  border-radius: 30px;
  border: none;
  font-size: 10px;
  color: white;
  cursor: pointer;
  opacity: 0.97;
  :hover {
    opacity: 1;
  }
`;

export default Header;
