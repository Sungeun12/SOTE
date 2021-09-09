import React from 'react';
import styled from 'styled-components';
import CreateVoteForm from '../../components/vote/CreateVoteForm';
import media from '../../util/style/media';
import color from '../../util/style/color';

function CreateVote() {
  return (
    <CreateVoteContainer>
      <Header>
        <h1>투표 만들기</h1>
        <Text>원하는 투표를 만들어보세요!</Text>
        <CreateVoteForm />
      </Header>
    </CreateVoteContainer>
  );
}

const CreateVoteContainer = styled.div`
  width: 100%;
  margin: 13vh auto;
`;
const Header = styled.div`
  margin: 0vh auto;
  line-height: 1.7;
  font-family: 'Nanum Gothic Coding', sans-serif;
  font-size: 1.6rem;
  width: 700px;
  @media (max-width: ${media.tablet}px) {
    width: 80%;
  }
`;
const Text = styled.div`
  font-size: 1rem;
  color: ${color.darkGray};
`;
export default CreateVote;
