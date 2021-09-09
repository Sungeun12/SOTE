import React from 'react';
import styled from 'styled-components';
import color from '../../../util/style/color';

function ToggleButton({ active, setActive, types }) {
  return (
    <ButtonGroup>
      {types.map(type => (
        <ButtonToggle key={type} active={active === type} onClick={() => setActive(type)}>
          {type}
        </ButtonToggle>
      ))}
    </ButtonGroup>
  );
}

const Button = styled.button`
  padding: 0;
  font-family: 'Nanum Gothic Coding', monospace;
  height: 50px;
  padding: 0 20px;
  text-align: center;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
`;
const ButtonToggle = styled(Button)`
  background-color: white;
  color: ${color.darkGray};

  ${({ active }) =>
    active &&
    `
    color: ${color.navy};
    border-bottom: 2px solid ${color.navy};
  `};
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin: 5vh 0 5vh 0;
`;
export default ToggleButton;
