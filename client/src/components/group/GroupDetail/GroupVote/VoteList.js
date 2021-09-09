import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import moment from 'moment';
import color from '../../../../util/style/color';
import { getDday } from '../../../../util/getDday';

function VoteList({ _id, title, organizer, startDate, endDate, closed }) {
  const history = useHistory();
  const newStart = moment(startDate).format('YYYY/MM/DD h:mm a');
  const newEnd = moment(endDate).format('YYYY/MM/DD h:mm a');
  const dDay = getDday(newEnd);
  const toVote = () => {
    if (dDay < 0) history.push(`/vote/group/${_id}/closed`);
    else history.push(`/vote/group/${_id}`);
  };
  return (
    <NoticeContainer key={_id} onClick={toVote}>
      <TopWrapper>
        <Dday closed={closed}>{closed ? '완료' : `D-${dDay}`}</Dday>
        <Text>{title}</Text>
      </TopWrapper>
      <BottomWrapper>
        <div style={{ marginRight: '10px' }}>{organizer.name}</div>
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
  background-color: ${props => (props.closed ? `${color.gray}` : `${color.skyBlue}`)};
  border-radius: 0 0 10px 0;
`;
export default VoteList;
