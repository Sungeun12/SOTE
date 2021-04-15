import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { dropDownMenuData } from './textMenuData';
import media from '../../../../util/media';

function Dropdown() {
  return (
    <DropdownContainer className="nav">
      {dropDownMenuData.map(({ link, text }) => (
        <DropdownMenu key={text}>
          <StyledLink activeClassName="active" to={link}>
            {text}
          </StyledLink>
        </DropdownMenu>
      ))}
    </DropdownContainer>
  );
}

const DropdownContainer = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  width: 160px;
  height: 100px;
  position: absolute;
  top: 60px;
  left: 170px;
  background-color: white;
  box-shadow: 0px 1px 1px rgba(15, 15, 15, 0.2);
  @media (max-width: ${media.tablet}px) {
    position: absolute;
    top: 240px;
    left: 80px;
    box-shadow: 0px 0px 0px 0px;
  }
`;
const DropdownMenu = styled.li`
  padding-left: 20px;
  height: 40px;
`;
const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  font-size: 16px;
  font-family: 'Nanum Gothic Coding', monospace;
  :hover {
    color: #1838a8;
  }
`;
export default Dropdown;
