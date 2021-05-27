import React from 'react';
import styled from 'styled-components';
import Result from '../../components/vote/VoteResult';
import media from '../../util/style/media';

function VoteResult({ match }) {
  const { id } = match.params;
  return (
    <Container>
      <Result id={id} />
    </Container>
  );
}

const Container = styled.div`
  width: 60%;
  height: 100%;
  margin: 7vh auto;
  @media (max-width: ${media.tablet}px) {
    width: 95%;
  }
`;
export default VoteResult;
