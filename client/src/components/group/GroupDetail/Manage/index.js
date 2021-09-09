import React, { useState } from 'react';
import styled from 'styled-components';
import ToggleButton from '../../../common/ToggleButton';
import ManageMember from './ManageMember';
import ManageWaiting from './ManageWaiting';

function Manage() {
  const types = ['멤버 관리', '대기 목록 관리'];
  const [active, setActive] = useState(types[0]);

  return (
    <ManageContainer>
      <ToggleButton types={types} active={active} setActive={setActive} />
      {active === types[0] && <ManageMember />}
      {active === types[1] && <ManageWaiting />}
    </ManageContainer>
  );
}

const ManageContainer = styled.div`
  margin: 0 auto;
  width: 70%;
  display: flex;
  flex-direction: column;
  font-family: 'Nanum Gothic Coding', monospace;
`;

export default Manage;
