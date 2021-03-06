import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { MdTurnedInNot } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import color from '../../../util/style/color';
import media from '../../../util/style/media';
import { getDday } from '../../../util/getDday';

function VoteItem({
  title,
  organizer,
  startDate,
  endDate,
  category,
  _id,
  titleCategory,
  closed,
  voteCount,
}) {
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
  const newStart = moment(startDate).format('YYYY/MM/DD h:mm a');
  const newEnd = moment(endDate).format('YYYY/MM/DD h:mm a');
  const dDay = getDday(newEnd);

  return (
    <ItemWrapper>
      <HeaderContainer>
        {closed === 'true' ? (
          <DdayDiv theme={theme}>완료</DdayDiv>
        ) : (
          <DdayDiv theme={theme}>D-{dDay}</DdayDiv>
        )}
        <MdTurnedInNot size="30" />
      </HeaderContainer>
      <Title>{title}</Title>
      <OrganizerWrapper>
        {organizer.profile ? (
          <img src={organizer.profile} alt={organizer.profile} />
        ) : (
          <FaUserCircle size="20" color="#696868" style={{ marginRight: '10px' }} />
        )}
        {organizer.name}
      </OrganizerWrapper>
      <DateDiv>시작일시: {newStart}</DateDiv>
      <DateDiv>종료 일시: {newEnd}</DateDiv>
      <BottomContainer>
        {category ? <Category>#{category}</Category> : <div />}
        <Participant>참여: {voteCount}</Participant>
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
  position: relative;
  margin: 0 auto;
  border: 1px solid ${color.gray};
  width: 20vw;
  height: 330px;
  border-radius: 5px;
  @media (max-width: 1000px) {
    width: 27vw;
    height: 350px;
  }
  @media (max-width: ${media.tablet}px) {
    width: 250px;
    height: 350px;
  }
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
  margin: 4vh auto 2vh auto;
  text-align: center;
  width: 95%;
  line-height: 25px;
`;
const OrganizerWrapper = styled.div`
  font-family: 'Nanum Gothic', monospace;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0 1vw 3vh 0;
`;
const DateDiv = styled.div`
  margin: 1vh 0 2vh 1vw;
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
  position: absolute;
  bottom: 20px;
  right: 32%;
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
