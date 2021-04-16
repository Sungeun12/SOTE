import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import Logo from './Logo';
import HamburgerMenu from './HamburgerMenu';
import TextMenu from './TextMenu';
import media from '../../../util/media';
import Button from './Button';
import IconMenu from './IconMenu';
import UserProfile from './UserProfile';

function Header() {
  const loginUser = true;
  const [isOpen, setOpen] = useState(false);

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
            <Button text="로그아웃" background="#1838A8" />
          ) : (
            <Button link="/login" text="로그인" background="#1838A8" />
          )}
        </ButtonContainer>

        <HamburgerMenu isOpen={isOpen} toggleMenu={toggleMenu} />
      </MenuItem>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  padding: 0px 2rem;
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
  }
`;

export default Header;
