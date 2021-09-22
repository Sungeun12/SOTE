import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { textData } from '../../components/mypage/NavBar/textData';
import NavBar from '../../components/mypage/NavBar';
import media from '../../util/style/media';
import { loadParticipatedVote } from '../../actions/myPage_action';
import storage from '../../util/storage';

function MyVote() {
  const userId = storage.get('user');
  const request = useSelector(state => state.myPage.request);
  const error = useSelector(state => state.myPage.error);
  const participatedVote = useSelector(state => state.myPage.participatedVote);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadParticipatedVote(userId));
  }, [dispatch]);

  return (
    <Container>
      <NavBar data={textData} />
      {request && <Text>loading...</Text>}
      {error && <Text>{error}</Text>}
      {!request && participatedVote && participatedVote.length === 0 && (
        <Text>참여한 투표가 없습니다.</Text>
      )}
      {!request && participatedVote && participatedVote.map(vote => <div>{vote}</div>)}
    </Container>
  );
}
const Container = styled.div`
  width: 90%;
  height: 100vh;
  @media (max-width: ${media.tablet}px) {
    width: 90%;
  }
  margin: 13vh auto;
`;
const Text = styled.div`
  margin: 5vh 0;
  text-align: center;
`;
export default MyVote;
