import React from 'react';
import styled from 'styled-components';
import CreateGroupButton from '../../components/group/CreateGroupButton';
import media from '../../util/style/media';

function GroupList() {
  return (
    <Container>
      <CreateGroupButton />
    </Container>
  );
}

const Container = styled.div`
  width: 80%;
  @media (max-width: ${media.tablet}px) {
    width: 80%;
  }
  margin: 7vh auto;
`;
export default GroupList;
