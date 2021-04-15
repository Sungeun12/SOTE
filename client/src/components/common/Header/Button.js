import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Button({ link, text, fontcolor, background, border }) {
  return link ? (
    <StyledLink to={link} fontcolor={fontcolor}>
      <HeaderButton type="button" background={background} border={border} fontcolor={fontcolor}>
        {text}
      </HeaderButton>
    </StyledLink>
  ) : (
    <HeaderButton type="button" background={background} border={border} fontcolor={fontcolor}>
      {text}
    </HeaderButton>
  );
}

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.fontcolor || 'white'};
  font-family: 'Nanum Gothic Coding', monospace;
`;
const HeaderButton = styled.div`
  font-family: 'Nanum Gothic Coding', monospace;
  width: 55px;
  text-align: center;
  background-color: ${props => props.background || 'white'};
  padding: 8px 10px;
  border-radius: 4px;
  border: 1px solid;
  border-color: ${props => props.border || 'none'};
  font-size: 13px;
  color: ${props => props.fontcolor || 'white'};
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
export default Button;
