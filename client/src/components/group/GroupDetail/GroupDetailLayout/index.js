import React from 'react';
import styled from 'styled-components';
import SideNavBar from './SideNavBar';
import color from '../../../../util/style/color';

function GroupDetailLayout({ children, id }) {
  return (
    <Container>
      <SideNavBar id={id} />
      <Item>{children}</Item>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 90%;
  margin: 7vh auto;
`;
const Item = styled.div`
  width: 80%;
  border: 1px solid ${color.middleGray};
  border-radius: 10px;
`;
export default GroupDetailLayout;
