import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import CreateGroupButton from './CreateGroupButton';
import { groupSort, sortTypes } from '../../../util/selectOption/selectOption';
import { customStyles } from '../../vote/VoteList/style';
import { loadAllGroup, unloadGroup } from '../../../actions/group_actions';

function GroupList() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState(groupSort[0].value);
  const [order, setOrder] = useState(sortTypes[0].value);
  console.log(category);
  useEffect(() => {
    dispatch(loadAllGroup(category, order));
    return () => {
      dispatch(unloadGroup());
    };
  }, [dispatch, category, order]);

  return (
    <ListContainer>
      <TopWrapper>
        <CreateGroupButton />
        <SelectWrapper>
          <Select
            value={groupSort.find(opt => opt.value === category)}
            options={groupSort}
            styles={customStyles}
            defaultValue={groupSort[0]}
            onChange={selected => {
              if (!selected) return;
              setCategory(selected.value);
            }}
          />
          <Space />
          <Select
            value={sortTypes.find(opt => opt.value === order)}
            options={sortTypes}
            styles={customStyles}
            defaultValue={sortTypes[0]}
            onChange={selected => {
              if (!selected) return;
              setOrder(selected.value);
            }}
          />
        </SelectWrapper>
      </TopWrapper>
    </ListContainer>
  );
}

const ListContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;
const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const SelectWrapper = styled.div`
  display: flex;
`;
const Space = styled.div`
  width: 1vw;
`;
export default GroupList;
