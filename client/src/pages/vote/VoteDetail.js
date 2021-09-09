import React from 'react';
import styled from 'styled-components';
import Detail from '../../components/vote/VoteDetail';

function VoteDetail({ match }) {
  const { id } = match.params;

  return (
    <Container>
      <Detail id={id} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 13vh auto;
`;
export default VoteDetail;
