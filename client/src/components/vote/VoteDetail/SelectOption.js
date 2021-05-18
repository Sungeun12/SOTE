import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import media from '../../../util/style/media';

function SelectOption({ index, name, singleType, _id, addResult, deleteResult }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) {
      addResult(index);
    }
    if (!checked) {
      deleteResult(index);
    }
  }, [checked]);

  return (
    <SelectOptionContainer>
      <Index>{index + 1}번</Index>
      <li>{name}</li>
      <li className="options">
        {singleType ? (
          <input
            type="radio"
            value={_id}
            style={{ transform: 'scale(1.3)', marginLeft: '1vw' }}
            name="options"
            checked={checked}
            onChange={e => setChecked(e.target.checked)}
          />
        ) : (
          <input
            type="checkbox"
            value={_id}
            style={{ transform: 'scale(1.3)', marginLeft: '1vw' }}
            name="options"
            checked={checked}
            onChange={e => setChecked(e.target.checked)}
          />
        )}
      </li>
    </SelectOptionContainer>
  );
}

const SelectOptionContainer = styled.ul`
  width: 100%;
  display: flex;
  font-family: 'Nanum Gothic Coding', monospace;
  margin: 0 auto;
  text-align: center;
  font-size: 1.3rem;
  @media (max-width: ${media.tablet}px) {
    margin: 2vh 0;
    width: 100%;
  }
`;
const Index = styled.li`
  margin-right: 1vw;
`;
export default SelectOption;
