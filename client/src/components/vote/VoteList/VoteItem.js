import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdTurnedInNot } from 'react-icons/md';
import { Link } from 'react-router-dom';
import color from '../../../util/style/color';

function VoteItem({ title, organizer, startDate, endDate, category, _id, titleCategory, closed }) {
  const colors = ['#1838a8', '#eed030', '#838383'];
  const [theme, setTheme] = useState(colors[0]);
  useEffect(() => {
    if (titleCategory === 'offical') {
      setTheme(colors[0]);
    }
    if (titleCategory === 'free') {
      setTheme(colors[1]);
    }
    if (closed === 'true') {
      setTheme(colors[2]);
    }
  }, [titleCategory]);
  console.log(startDate, endDate);
  return (
    <ItemWrapper>
      <HeaderContainer>
        <DdayDiv theme={theme}>D-15</DdayDiv>
        <MdTurnedInNot size="30" />
      </HeaderContainer>
      <Title>{title}</Title>
      <Text>{organizer}</Text>
      <Date>2021-05-27 ~2021-03-20</Date>
      <BottomContainer>
        {category ? <Category>#{category}</Category> : <div />}
        <Participant>참여: 00명</Participant>
      </BottomContainer>
      {closed === 'true' ? (
        <ToVoteLink to={`/vote/${titleCategory}/${_id}/closed`}>
          <VoteButton type="button" value="결과보기" theme={theme} />
        </ToVoteLink>
      ) : (
        <ToVoteLink to={`/vote/${titleCategory}/${_id}`}>
          <VoteButton type="button" value="투표하기" theme={theme} />
        </ToVoteLink>
      )}
    </ItemWrapper>
  );
}

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${color.gray};
  width: 250px;
  height: 310px;
  border-radius: 5px;
`;
const HeaderContainer = styled.div`
  color: ${color.gray};
  display: flex;
  justify-content: space-between;
`;
const DdayDiv = styled.div`
  opacity: 0.7;
  padding: 0px;
  width: 80px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  color: white;
  background-color: ${props => props.theme || 'white'};
  border-radius: 5px 0 10px 0;
`;
const Title = styled.div`
  text-align: center;
  width: 90%;
  margin: 5vh auto 2vh auto;
  line-height: 25px;
`;
const Text = styled.div`
  margin: 0vh 0vw 3vh 1vw;
  font-family: 'Nanum Gothic', monospace;
`;
const Date = styled.div`
  text-align: center;
  margin: 1vh 1vw;
  font-family: 'Nanum Gothic', monospace;
  font-size: 0.8rem;
`;
const BottomContainer = styled.div`
  margin: 2vh 1vw;
  font-size: 0.8rem;
  display: flex;
  justify-content: space-between;
`;
const Category = styled.div`
  background-color: ${color.gray};
  color: white;
  width: 50px;
  text-align: center;
  height: 20px;
  line-height: 20px;
  border-radius: 10px;
  opacity: 0.6;
`;
const Participant = styled.div`
  font-family: 'Nanum Gothic', monospace;
  color: ${color.gray};
`;
const ToVoteLink = styled(Link)`
  text-decoration: none;
  margin: 0 auto;
  justify-content: flex-end;
`;
const VoteButton = styled.input`
  text-align: center;
  width: 100px;
  padding: 10px 12px;
  font-family: 'Nanum Gothic Coding', monospace;
  font-size: 1rem;
  background-color: ${props => props.theme || '#213E70'};
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;
export default VoteItem;
