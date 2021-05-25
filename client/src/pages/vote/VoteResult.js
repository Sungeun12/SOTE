import React from 'react';
import styled from 'styled-components';
import Result from '../../components/vote/VoteResult';

function VoteResult({ match }) {
  const { id } = match.params;
  return (
    <Container>
      <Result id={id} />
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100%;
  margin: 7vh 0px;
`;
export default VoteResult;
