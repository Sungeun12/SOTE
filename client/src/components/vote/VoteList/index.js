import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllVote, unloadVote } from '../../../actions/vote_actions';
import ToggleButton from './ToggleButton';
import VoteItem from './VoteItem';
import { sortTypes } from '../../../util/selectOption/selectOption';
import { customStyles } from './style';
import media from '../../../util/style/media';

const types = ['진행중인투표', '완료된투표'];

function VoteList({ match, titleCategory }) {
  const [active, setActive] = useState(types[0]);
  const [sort, setSort] = useState(sortTypes[0]);
  const [closed, setClosed] = useState('false');
  const dispatch = useDispatch();

  useEffect(() => {
    if (active === '진행중인투표') {
      setClosed('false');
    }
    if (active === '완료된투표') {
      setClosed('true');
    }
  }, [active]);
  useEffect(() => {
    dispatch(loadAllVote(titleCategory, closed));
    return () => {
      dispatch(unloadVote());
    };
  }, [dispatch, titleCategory, closed]);

  const voteList = useSelector(state => state.vote.voteList);
  const request = useSelector(state => state.vote.request);

  return (
    <Container>
      <ToggleButton active={active} setActive={setActive} types={types} />
      {request && <TextAlert>loading...</TextAlert>}
      {!request && voteList?.length === 0 && <TextAlert>현재 투표가 없습니다.</TextAlert>}
      <VoteItemContainer>
        <div style={{ marginLeft: 'auto' }}>
          <Select
            value={sortTypes.find(opt => opt.value === sort)}
            options={sortTypes}
            styles={customStyles}
            defaultValue={sortTypes[0]}
            onChange={selected => {
              if (!selected) return;
              setSort(selected.value);
            }}
          />
        </div>
        <VoteItemWrapper>
          {voteList.map(({ title, organizer, startDate, endDate, category, _id, description }) => (
            <VoteItem
              key={_id}
              title={title}
              organizer={organizer}
              startDate={startDate}
              endDate={endDate}
              category={category}
              _id={_id}
              match={match}
              titleCategory={titleCategory}
              description={description}
              closed={closed}
            />
          ))}
        </VoteItemWrapper>
      </VoteItemContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  font-family: 'Nanum Gothic Coding', monospace;
  font-size: 1rem;
`;
const VoteItemContainer = styled.div`
  width: 100%;
  justify-content: center;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
const VoteItemWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 5vh auto;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 6vh;
    column-gap: 5vw;
  }
  @media (max-width: ${media.tablet}px) {
    grid-template-columns: 1fr 1fr;
    row-gap: 6vh;
    column-gap: 15vw;
  }
  @media (max-width: ${media.mobileL}px) {
    grid-template-columns: 1fr;
    row-gap: 6vh;
  }
  row-gap: 10vh;
  column-gap: 4vw;
`;
const TextAlert = styled.div`
  text-align: center;
  font-family: 'Nanum Gothic', monospace;
`;
export default VoteList;
