import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import moment from 'moment';
import ToggleButton from '../../../common/ToggleButton';
import VoteList from './VoteList';
import { getDday } from '../../../../util/getDday';

function GroupVote() {
  const types = ['진행중인 투표', '완료된 투표'];
  const [active, setActive] = useState(types[0]);
  const votes = useSelector(state => state.group.votes);
  return (
    <div>
      <ToggleButton types={types} setActive={setActive} active={active} />
      {active === types[0] && (
        <VoteListWrapper>
          {votes &&
            votes
              .filter(({ endDate }) => getDday(moment(endDate).format('YYYY/MM/DD h:mm a')) > 0)
              .map(({ _id, organizer, title, startDate, endDate }) => (
                <VoteList
                  key={_id}
                  _id={_id}
                  title={title}
                  organizer={organizer}
                  startDate={startDate}
                  endDate={endDate}
                  closed={false}
                />
              ))}
        </VoteListWrapper>
      )}
      {active === types[1] && (
        <VoteListWrapper>
          {votes &&
            votes
              .filter(({ endDate }) => getDday(moment(endDate).format('YYYY/MM/DD h:mm a')) < 0)
              .map(({ _id, organizer, title, startDate, endDate }) => (
                <VoteList
                  key={_id}
                  _id={_id}
                  title={title}
                  organizer={organizer}
                  startDate={startDate}
                  endDate={endDate}
                  closed
                />
              ))}
        </VoteListWrapper>
      )}
    </div>
  );
}

const VoteListWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;
export default GroupVote;
