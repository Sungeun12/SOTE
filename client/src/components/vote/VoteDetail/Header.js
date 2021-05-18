import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { MdTurnedInNot, MdGroup } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import color from '../../../util/style/color';

function Header({ currentVote, closed }) {
  const params = useParams();
  const userPic = useSelector(state => state.user.userPic);
  const colors = ['#1838a8', '#eed030', '#838383'];
  const [theme, setTheme] = useState('white');
  const [titleCategory, setTitleCategory] = useState(params.category);

  useEffect(() => {
    setTitleCategory(params.category);
  }, [params]);

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

  return (
    <HeaderContainer>
      <TopWrapper>
        <Dday theme={theme}>D-15</Dday>
        <MdTurnedInNot size="30" />
      </TopWrapper>
      <TitleWrapper>
        <Title>{currentVote && currentVote.title}</Title>
        <Date>
          {currentVote && currentVote.startDate}~{currentVote && currentVote.endDate}
        </Date>
      </TitleWrapper>
      <BottomWrapper>
        <UserInfo>
          {userPic ? (
            <img src={userPic} alt={userPic} />
          ) : (
            <FaUserCircle size="25" color="#696868" style={{ marginRight: '20px' }} />
          )}
          <div>김눈송</div>
        </UserInfo>
        <Participant>
          <MdGroup size="25" color="#696868" style={{ marginRight: '20px' }} />
          <div>참여자: 00명</div>
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
