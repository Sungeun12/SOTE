import React from 'react';
import styled from 'styled-components';
import votePic from '../../img/picture.png';
import media from '../../util/style/media';
import JoinButton from './JoinButton';

function Introduction() {
  const loginUser = true;

  return (
    <IntroductionContainer
      style={{
        backgroundImage: `url("${votePic}")`,
      }}
    >
      <TextContainer>
        <MainText>SOTE is a Secure </MainText>
        <MainText>Sookmyung Online Voting System</MainText>
        <DescText>
          Optimize your election with a blockchain-based online voting tool. It is easy to set up
          and use and no specific training or IT literacy is needed.
        </DescText>
      </TextContainer>
      {loginUser ? '' : <JoinButton />}
    </IntroductionContainer>
  );
}

const IntroductionContainer = styled.div`
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 95vh;
  width: 97vw;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const TextContainer = styled.div`
  padding: 8vh 4.5vw;
`;
const MainText = styled.div`
  font-family: 'PT Sans', sans-serif;
  font-size: 4rem;
  font-weight: 800;
  color: #313131;
  @media (max-width: ${media.tablet}px) {
    font-size: 2.5rem;
  }
`;
const DescText = styled.div`
  margin-top: 7vh;
  font-family: 'PT Sans', sans-serif;
  font-size: 1.6rem;
  color: #888686;
  width: 78%;
  @media (max-width: ${media.tablet}px) {
    font-size: 1.6rem;
  }
`;
export default Introduction;
