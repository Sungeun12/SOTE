import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import List from '../../components/vote/VoteList';

function VoteList({ match }) {
  const [title, setTitle] = useState('공식행사투표');

  const titleCategory = match.params.category;

  useEffect(() => {
    if (titleCategory === 'official') {
      setTitle('공식행사투표');
    }
    if (titleCategory === 'free') {
      setTitle('자유투표');
    }
  }, [titleCategory]);

  return (
    <Container>
      <Title>{title}</Title>
      <List match={match} titleCategory={titleCategory} />
    </Container>
  );
}

const Container = styled.div`
  width: 95%;
  height: 100%;
  margin: 7vh auto;
`;
const Title = styled.div`
  font-family: 'Nanum Gothic Coding', sans-serif;
  font-size: 1.6rem;
  text-align: center;
  line-height: 1.7;
`;
export default VoteList;
