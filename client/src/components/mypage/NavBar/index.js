import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

function NavBar({ location, data }) {
  const setCurrentTab = link => {
    const path = location.pathname.split('/');
    return path[1] === link.split('/')[1];
  };
  return (
    <Container>
      {data.map(({ text, link, subMenu }) => (
        <div key={text}>
          <StyledLink to={link} path={setCurrentTab(link) ? '#1838a8' : 'black'}>
            {text}
          </StyledLink>
          {subMenu && (
            <DropdownContent>
              {subMenu.map(({ subText, subLink }) => (
                <StyledLink key={subText} to={subLink}>
                  {subText}
                </StyledLink>
              ))}
            </DropdownContent>
          )}
        </div>
      ))}
    </Container>
  );
}
const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #ffff;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 15px 8px;
  z-index: 99;
  :hover {
    display: block;
  }
`;
const Container = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  padding-bottom: 1vh;
  justify-content: center;
  position: relative;
  &:hover {
    ${DropdownContent} {
      display: block;
    }
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: 600;
  color: ${props => props.path || 'black'};
  :hover {
    color: #1838a8;
  }
  display: flex;
  padding: 1vh 2vw;
`;

export default withRouter(NavBar);
