import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { textData } from '../../components/mypage/NavBar/textData';
import NavBar from '../../components/mypage/NavBar';
import media from '../../util/style/media';
import ParticipatedVote from '../../components/mypage/ParticipatedVote';
import CreateVote from '../../components/mypage/CreateVote';

function MyVote({ match }) {
  const { category } = match.params;
  const [currentTitle, setCurrentTitle] = useState('참여한 투표');
  console.log(category);

  useEffect(() => {
    if (category === 'participated') {
      setCurrentTitle('참여한 투표');
    }
    if (category === 'create') {
      setCurrentTitle('내가 만든 투표');
    }
  }, [category]);
  return (
    <Container>
      <NavBar data={textData} />
      <VoteWrapper>
        <Title>{currentTitle}</Title>
        {category === 'participated' && <ParticipatedVote />}
        {category === 'create' && <CreateVote />}
      </VoteWrapper>
    </Container>
  );
}
const Container = styled.div`
  width: 90%;
  font-family: 'Nanum Gothic', monospace;
  height: 100vh;
  @media (max-width: ${media.tablet}px) {
    width: 90%;
  }
  margin: 13vh auto;
`;
const Title = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 2vh;
`;
const VoteWrapper = styled.div`
  margin-top: 5vh;
  width: 80%;
  margin: 5vh auto 0;
`;

export default MyVote;
