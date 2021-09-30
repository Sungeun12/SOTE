import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import moment from 'moment';
import color from '../../../util/style/color';
import { getDday } from '../../../util/getDday';

function VoteItem({ _id, title, startDate, endDate, voteType }) {
  const history = useHistory();
  const colors = ['#1838a8', '#eed030', '#838383', '#81AEC6'];
  const [theme, setTheme] = useState('white');
  const newStart = moment(startDate).format('YYYY/MM/DD h:mm a');
  const newEnd = moment(endDate).format('YYYY/MM/DD h:mm a');
  const dDay = getDday(newEnd);
  const toVote = () => {
    if (dDay < 0) history.push(`/vote/${voteType}/${_id}/closed`);
    else history.push(`/vote/${voteType}/${_id}`);
  };
  useEffect(() => {}, []);
  useEffect(() => {
    if (dDay < 0) {
      setTheme(colors[2]);
    }
    if (dDay > 0 && voteType === 'official') {
      setTheme(colors[0]);
    }
    if (dDay > 0 && voteType === 'free') {
      setTheme(colors[1]);
    }
    if (dDay > 0 && voteType === 'group') {
      setTheme(colors[3]);
    }
  }, [voteType, dDay]);

  return (
    <NoticeContainer key={_id} onClick={toVote}>
      <TopWrapper>
        <Dday theme={theme}>{dDay < 0 ? '완료' : `D-${dDay}`}</Dday>
        <Text>{title}</Text>
      </TopWrapper>
      <BottomWrapper>
        <div>
          {newStart}~{newEnd}
        </div>
      </BottomWrapper>
    </NoticeContainer>
  );
}

const NoticeContainer = styled.div`
  width: 100%;
  border: 1px solid ${color.middleGray};
  cursor: pointer;
  margin: 0 auto;
`;
const TopWrapper = styled.div`
  display: flex;
`;
const Text = styled.div`
  font-size: 1rem;
  margin: 2vh 2vw 1vh;
`;
const BottomWrapper = styled.div`
  display: flex;
  margin: 1vh 1vw 1vh;
  font-size: 0.8rem;
`;
const Dday = styled.div`
  opacity: 0.7;
  padding: 0px;
  width: 80px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  color: white;
  background-color: ${props => props.theme};
  border-radius: 0 0 10px 0;
`;
export default VoteItem;
