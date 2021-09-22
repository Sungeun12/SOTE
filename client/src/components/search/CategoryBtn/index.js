import React from 'react';
import styled from 'styled-components';
import color from '../../../util/style/color';

function CategoryBtn({ text, currentCategory, setCategory, value }) {
  const onClick = () => {
    setCategory(value);
  };
  return (
    <BtnContainer
      bg={currentCategory ? '#c4c4c4' : 'white'}
      color={currentCategory ? 'white' : 'black'}
      onClick={onClick}
    >
      {text}
    </BtnContainer>
  );
}
const BtnContainer = styled.div`
  border: 1px solid ${color.middleGray};
  margin-right: 1vw;
  padding: 1vh 1vw;
  border-radius: 20px;
  cursor: pointer;
  background-color: ${props => props.bg};
  color: ${props => props.color};
`;
export default CategoryBtn;
