import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import color from '../../../util/style/color';

function CreateGroupButton() {
  return (
    <StyledLink to="/creategroup">
      <Button type="button">단체 만들기</Button>
    </StyledLink>
  );
}

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Button = styled.button`
  margin-right: 1vw;
  width: 150px;
  height: 50px;
  text-align: center;
  padding: 8px 10px;
  background-color: ${color.navy};
  color: white;
  font-family: 'Nanum Gothic Coding', sans-serif;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  opacity: 0.95;
  :hover {
    opacity: 1;
  }
`;
export default CreateGroupButton;
