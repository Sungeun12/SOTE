import React from 'react';
import styled from 'styled-components';
import SideNavBar from './SideNavBar';

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
  margin: 13vh auto;
`;
const Item = styled.div`
  width: 80%;
  height: 100vh;
`;
export default GroupDetailLayout;
