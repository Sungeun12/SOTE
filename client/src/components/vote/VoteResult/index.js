import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loadClosedIdVote, unloadVote } from '../../../actions/vote_actions';
import Header from '../VoteDetail/Header';
import ResultGraph from './ResultGraph';
import Comment from './Comment';
import color from '../../../util/style/color';

function VoteResult({ id }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadClosedIdVote(id));
    return () => {
      dispatch(unloadVote());
    };
  }, [dispatch, id]);

  const comments = useSelector(state => state.vote.comments);
  const currentVote = useSelector(state => state.vote.currentVote);
  const currentOptions = useSelector(state => state.vote.currentOptions);
  console.log(currentVote);
  console.log(currentOptions);
  return (
    <Container>
      <Header currentVote={currentVote} closed />
      <ResultGraph />
      <Line />
      <Comment comments={comments} id={id} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
`;
const Line = styled.div`
  margin: 3vh 0;
  width: 100%;
  border-bottom: 1px solid ${color.gray};
  opacity: 0.3;
`;
export default VoteResult;
