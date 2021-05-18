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
  width: 200px;
  height: 50px;
  text-align: center;
  padding: 8px 10px;
  border: 1px solid ${color.navy};
  font-size: 1rem;
  cursor: pointer;
`;
const ButtonToggle = styled(Button)`
  background-color: white;
  color: ${color.navy};

  ${({ active }) =>
    active &&
    `
    background-color: ${color.navy};
    color: white;
  `};
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  margin: 5vh 0 5vh 0;
`;
export default ToggleButton;
