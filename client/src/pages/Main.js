import React from 'react';
import styled from 'styled-components';
import Introduction from '../components/main/Introduction';

function Main() {
  return (
    <MainContainer>
      <Introduction />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  height: 100vh;
`;

export default Main;
