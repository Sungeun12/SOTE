import React from 'react';
import styled from 'styled-components';
import VoteForm from '../components/CreateVote/index';
import media from "../util/style/media";
import color from "../util/style/color";

function CreateVote() {
    return (
        <CreateVoteContainer>
            <Header>
                <h1>투표 만들기</h1>
                <Text>모든 값을 입력해주세요!</Text>
            </Header>
            <VoteForm/>
        </CreateVoteContainer>
    );
}

const CreateVoteContainer = styled.div`
  width: 100vw;
    margin: 7vh 0px;
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
