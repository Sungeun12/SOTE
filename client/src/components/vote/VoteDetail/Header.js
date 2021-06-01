import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { MdTurnedInNot, MdGroup } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import moment from 'moment';
import color from '../../../util/style/color';
import Loading from '../../common/Loading';
import { getDday } from '../../../util/getDday';

function Header({ currentVote, closed }) {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [newStart, setNewStart] = useState('');
  const [newEnd, setNewEnd] = useState('');
  const colors = ['#1838a8', '#eed030', '#838383'];
  const [theme, setTheme] = useState('white');
  const [titleCategory, setTitleCategory] = useState(params.category);
  const dDay = newEnd ? getDday(newEnd) : '';
  useEffect(() => {
    if (currentVote) {
      setLoading(false);
      setNewStart(moment(currentVote.startDate).format('YYYY/MM/DD h:mm a'));
      setNewEnd(moment(currentVote.endDate).format('YYYY/MM/DD h:mm a'));
    }
    if (!currentVote) {
      setLoading(true);
    }
  }, [currentVote]);

  useEffect(() => {
    setTitleCategory(params.category);
  }, [params]);
  console.log(currentVote);
  useEffect(() => {
    if (closed === true) {
      setTheme(colors[2]);
    }
    if (!closed && titleCategory === 'official') {
      setTheme(colors[0]);
    }
    if (!closed && titleCategory === 'free') {
      setTheme(colors[1]);
    }
  }, [titleCategory, closed]);

  if (loading) {
    return <Loading />;
  }
  return (
    <HeaderContainer>
      <TopWrapper>
        {currentVote?.category && <Category>{currentVote.category}</Category>}
        {closed ? <Dday theme={theme}>완료</Dday> : <Dday theme={theme}>D-{dDay}</Dday>}
        <MdTurnedInNot size="30" />
      </TopWrapper>
      <TitleWrapper>
        <Title>{currentVote?.title}</Title>
        <Date>
          {newStart} ~ {newEnd}
        </Date>
      </TitleWrapper>
      <BottomWrapper>
        <UserInfo>
          {currentVote?.organizer?.profile ? (
            <img src={currentVote.organizer.profile} alt="투표 작성자 이미지" />
          ) : (
            <FaUserCircle size="25" color="#696868" style={{ marginRight: '20px' }} />
          )}
          <div>{currentVote?.organizer?.name}</div>
        </UserInfo>
        <Participant>
          <MdGroup size="25" color="#696868" style={{ marginRight: '20px' }} />
          <div>참여자: {currentVote?.voteCount}명</div>
        </Participant>
      </BottomWrapper>
      <Line />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  font-family: 'Nanum Gothic Coding', monospace;
  display: flex;
  flex-direction: column;
`;
const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const Category = styled.div`
  font-size: 1.3rem;
  opacity: 0.7;
  padding: 0px;
  width: 80px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  color: white;
  background-color: #ff7e7e;
  border-radius: 20px;
  margin-right: 15px;
`;
const Dday = styled.div`
  font-size: 1.3rem;
  opacity: 0.7;
  padding: 0px;
  width: 80px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  color: white;
  background-color: ${props => props.theme || 'white'};
  border-radius: 20px;
  margin-right: 15px;
`;
const TitleWrapper = styled.ul`
  text-align: center;
  line-height: 40px;
  margin: 3vh 0;
`;
const Title = styled.li`
  font-size: 1.6rem;
`;
const Date = styled.li`
  font-family: 'Nanum Gothic', monospace;
`;
const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;
const Participant = styled.div`
  display: flex;
  font-family: 'Nanum Gothic', monospace;
  align-items: center;
`;
const Line = styled.div`
  margin: 3vh 0;
  width: 100%;
  border-bottom: 1px solid ${color.gray};
  opacity: 0.3;
`;
export default Header;
