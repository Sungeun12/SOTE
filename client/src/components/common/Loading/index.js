import React from 'react';
import styled from 'styled-components';

function Loading() {
  return <Container>loading...</Container>;
}

const Container = styled.div`
  text-align: center;
  font-size: 1.3rem;
  font-family: 'Nanum Gothic', monospace;
  height: 100vh;
  margin: 20vh 0;
`;
export default Loading;
