import React from 'react';
import { MdPersonOutline } from 'react-icons/md';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { menu } from './menu';
import color from '../../../../util/style/color';

function SideNavBar({ id }) {
  const group = useSelector(state => state.group.currentGroup);

  return (
    <NavBarContainer className="group_nav">
      <GroupWrapper>
        <li>{group && <Img src={`http://localhost:5000/${group.image}`} alt="그룹이미지" />}</li>
        <Name>{group && group.name}</Name>
        <Member>
          <MdPersonOutline size={20} style={{ marginRight: '2px' }} />
          {group && group?.members?.length + group?.managers?.length}
        </Member>
        <li>{group && group.description}</li>
      </GroupWrapper>
      <Line />
      {menu.map(({ text, link, key }) => (
        <NavMenu to={`/group/${id}${link}`} key={key} activeClassName="active">
          {text}
        </NavMenu>
      ))}
    </NavBarContainer>
  );
}

const NavBarContainer = styled.div`
  font-family: 'Nanum Gothic', monospace;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 20%;
  min-width: 200px;
  margin-right: 10px;
  border: 1px solid ${color.middleGray};
  border-radius: 5px;
  padding: 0px 20px;
  height: 90vh;
`;
const GroupWrapper = styled.ul`
  width: 100%;
  margin: 0 auto;
`;
const Img = styled.img`
  width: 100%;
  min-width: 200px;
  height: 200px;
  border-radius: 10px;
`;
const Name = styled.li`
  margin: 3vh 0 1vh 0;
  font-size: 1.3rem;
  font-family: 'Nanum Gothic Coding', monospace;
`;
const Member = styled.li`
  display: flex;
  font-size: 1rem;
  align-items: center;
  justify-content: flex-end;
  margin: 0 30px 1.5vh 0;
`;
const Line = styled.div`
  width: 80%;
  margin: 4vh auto 2vh auto;
  border-bottom: 1px solid ${color.gray};
`;
const NavMenu = styled(NavLink)`
  text-decoration: none;
  font-size: 1.2rem;
  color: black;
  margin: 1.5vh 0;
  font-family: 'Nanum Gothic Coding', monospace;
  :hover {
    color: ${color.navNavy};
  }
`;
export default SideNavBar;
