import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import color from '../../util/style/color';

function JoinButton() {
  return (
    <Button type="button">
      <StyledLink to="signup">Join Us</StyledLink>
    </Button>
  );
}

const Button = styled.button`
  margin: 0 0 8vh 4.5vw;
  font-family: 'PT Sans', sans-serif;
  font-weight: 800;
  width: 180px;
  height: 50px;
  text-align: center;
  padding: 8px 10px;
  border-radius: 4px;
  border: 1.7px solid ${color.navy};
  font-size: 20px;
  cursor: pointer;
  background: white;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${color.navy};
`;
export default JoinButton;
