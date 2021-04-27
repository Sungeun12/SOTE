import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { MdNotificationsNone } from 'react-icons/md';
import { RiFileList3Line } from 'react-icons/ri';

function IconMenu() {
  return (
    <IconMenuContainer>
      <Link to="/search">
        <BiSearch size="25" color="#484646" />
      </Link>
      <WhiteSpace />
      <Link to="/myvote">
        <RiFileList3Line size="25" color="#484646" />
      </Link>
      <WhiteSpace />
      <Link to="/alarm">
        <MdNotificationsNone size="25" color="#484646" />
      </Link>
    </IconMenuContainer>
  );
}

const IconMenuContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.8rem;
`;

const WhiteSpace = styled.div`
  width: 0.5rem;
`;
export default IconMenu;
