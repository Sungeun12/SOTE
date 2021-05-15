import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import MenuToggle from './MenuToggle';
import MenuList from './MenuList';
import media from '../../../../util/style/media';

const menuVariants = {
  open: {
    transform: 'translateX(3%)',
  },
  closed: {
    transform: 'translateX(103%)',
  },
};

const menuTransition = {
  type: 'spring',
  duration: 1,
  stiffness: 33,
  delay: 0.1,
};

function HamburgerMenu({ isOpen, toggleMenu, loginUser }) {
  return (
    <HamburgerMenuContainer>
      <MenuToggle toggle={toggleMenu} isOpen={isOpen} />
      <MenuContainer
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={menuVariants}
        transition={menuTransition}
      >
        <MenuList loginUser={loginUser} />
      </MenuContainer>
    </HamburgerMenuContainer>
  );
}

const HamburgerMenuContainer = styled.div`
  display: none;
  @media (max-width: ${media.tablet}px) {
    display: flex;
  }
`;
const MenuContainer = styled(motion.div)`
  min-width: 200px;
  width: 100%;
  max-width: 30%;
  height: 100%;
  background-color: #fff;
  box-shadow: -2px 0 2px rgba(15, 15, 15, 0.3);
  z-index: 90;
  position: fixed;
  top: 0;
  right: 0;
  transform: translateX(4em);
  user-select: none;
  padding: 1em 2.5em;
`;

export default HamburgerMenu;
