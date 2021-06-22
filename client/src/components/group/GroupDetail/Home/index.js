import React from 'react';
import styled from 'styled-components';
import notice from './notice.json';
import vote from './vote.json';
import color from '../../../../util/style/color';

function Home() {
  return (
    <Container>
      <Title>공지사항</Title>
      {notice.data.map(({ text, writer, id, date }) => (
        <NoticeContainer key={id}>
          <Text>{text}</Text>
          <BottomWrapper>
            <div style={{ marginRight: '10px' }}>{writer}</div>
            <div>{date}</div>
          </BottomWrapper>
        </NoticeContainer>
      ))}
      <Title>진행중인 투표</Title>
      {vote.data.map(({ id, text, writer, dDay, date }) => (
        <NoticeContainer key={id}>
          <Dday>D-{dDay}</Dday>
          <Text>{text}</Text>
          <BottomWrapper>
            <div>{writer}</div>
            <div>{date}</div>
          </BottomWrapper>
        </NoticeContainer>
      ))}
    </Container>
  );
}

const Container = styled.div`
  margin: 0 auto;
  width: 70%;
  display: flex;
  flex-direction: column;
  font-family: 'Nanum Gothic', monospace;
  font-size: 1rem;
`;
const Title = styled.div`
  text-align: center;
  font-size: 1.5rem;
  margin: 7vh 0;
  font-family: 'Nanum Gothic Coding', monospace;
`;
const NoticeContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  justify-content: space-between;
  border: 1px solid ${color.middleGray};
`;
const Text = styled.div`
  font-size: 1.2rem;
  margin: 1vh 1vw;
`;
const BottomWrapper = styled.div`
  display: flex;
  margin: 1vh 1vw;
`;
const Dday = styled.div`
  opacity: 0.7;
  padding: 0px;
  width: 80px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  color: white;
  background-color: ${color.navy};
  border-radius: 0 0 10px 0;
`;
export default Home;
