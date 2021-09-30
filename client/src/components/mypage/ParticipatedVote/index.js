import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import storage from '../../../util/storage';
import { loadParticipatedVote } from '../../../actions/myPage_action';
import VoteItem from '../../common/VoteItem';

function ParticipatedVote() {
  const userId = storage.get('user');
  const request = useSelector(state => state.myPage.request);
  const error = useSelector(state => state.myPage.error);
  const participatedVote = useSelector(state => state.myPage.participatedVote);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadParticipatedVote(userId));
  }, [dispatch]);
  return (
    <div>
      {request && <Text>loading...</Text>}
      {error && <Text>{error}</Text>}
      {!request && participatedVote && participatedVote.length === 0 && (
        <Text>참여한 투표가 없습니다.</Text>
      )}
      {!request &&
        participatedVote &&
        participatedVote.map(({ _id, organizer, title, startDate, endDate, voteType }) => (
          <VoteItem
            key={_id}
            _id={_id}
            title={title}
            organizer={organizer}
            startDate={startDate}
            endDate={endDate}
            voteType={voteType}
          />
        ))}
    </div>
  );
}
const Text = styled.div`
  margin: 5vh 0;
  text-align: center;
`;
export default ParticipatedVote;
