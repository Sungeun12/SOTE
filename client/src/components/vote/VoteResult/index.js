import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loadIdVote, unloadVote } from '../../../actions/vote_actions';
import Header from '../VoteDetail/Header';
import media from '../../../util/style/media';

function VoteResult({ id }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadIdVote(id));
    return () => {
      dispatch(unloadVote());
    };
  }, [dispatch, id]);
  const currentVote = useSelector(state => state.vote.currentVote);
  const currentOptions = useSelector(state => state.vote.currentOptions);
  console.log(currentVote);
  console.log(currentOptions);
  return (
    <Container>
      <Header currentVote={currentVote} closed />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 0 auto;
  @media (max-width: ${media.tablet}px) {
    width: 95%;
  }
`;
export default VoteResult;
