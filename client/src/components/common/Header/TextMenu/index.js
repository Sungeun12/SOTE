import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { BiChevronDown } from 'react-icons/bi';
import Dropdown from './Dropdown';
import { textMenuData } from './textMenuData';
import media from '../../../../util/style/media';

function TextMenu() {
  const [isDrop, setIsDrop] = useState(false);

  const onClick = () => {
    setIsDrop(true);
  };
  const onMouseEnter = () => {
    setIsDrop(true);
  };

  const onMouseLeave = () => {
    setIsDrop(false);
  };

  return (
    <MenuContainer className="nav">
      {textMenuData.map(({ link, text, dropdown }) =>
        dropdown ? (
          <MenuItem
            key={text}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
          >
            <StyledLink activeClassName="active" to={link}>
              {text}
              <BiChevronDown style={{ height: '60px', lineHeight: '60px' }} />
            </StyledLink>

            {isDrop && <Dropdown />}
          </MenuItem>
        ) : (
          <MenuItem key={text}>
            <StyledLink to={link} activeClassName="active">
              {text}
            </StyledLink>
          </MenuItem>
        ),
      )}
    </MenuContainer>
  );
}

const MenuContainer = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  height: 100%;
  @media (max-width: ${media.tablet}px) {
    flex-direction: column;
  }
`;
const MenuItem = styled.li`
  height: 60px;
  line-height: 60px;
  margin: 0 0.5rem;
  font-family: 'Nanum Gothic Coding', monospace;
  font-size: 16px;
  :hover {
    color: #1838a8;
  }
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  font-weight: 600;
  color: black;
  :hover {
    color: #1838a8;
  }
  display: flex;
`;

export default TextMenu;
