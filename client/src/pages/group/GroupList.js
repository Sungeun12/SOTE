import React from 'react';
import styled from 'styled-components';
import List from '../../components/group/GroupList';
import media from '../../util/style/media';

function GroupList() {
  return (
    <Container>
      <List />
    </Container>
  );
}

const Container = styled.div`
  width: 80%;
  @media (max-width: ${media.tablet}px) {
    width: 90%;
  }
  margin: 7vh auto;
`;
export default GroupList;
