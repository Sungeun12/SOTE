import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

function Logo({ closeMenu }) {
  return (
    <LogoLink activeClassName="active" onClick={closeMenu} to="/">
      SOTE
    </LogoLink>
  );
}

const LogoLink = styled(NavLink)`
  color: black;
  font-size: 25px;
  font-weight: 800;
  text-decoration: none;
  margin: auto 0;
  padding-right: 2rem;
  font-family: 'Do Hyeon', sans-serif;
`;
export default Logo;
