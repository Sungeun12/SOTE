import React, { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import * as S from '../style';
import { customStyles } from '../style';
import {
  FreeVoteCategory,
  adminVote,
  memberVote,
} from '../../../../util/selectOption/selectOption';
import media from '../../../../util/style/media';
import { loadUserGroup } from '../../../../api/group';

function VoteType({ control, watch }) {
  const user = useSelector(state => state.user.user);
  const [options, setOptions] = useState(memberVote);
  const [freecategory, setFreeCategory] = useState(false);
  const [groupCategory, setGroupCategory] = useState(false);
  const [groupList, setGroupList] = useState([]);
  const [selectGroup, setSelectGroup] = useState([]);
  const voteType = watch('voteType', 'free');

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    if (!user._id) return;
    // eslint-disable-next-line no-underscore-dangle
    loadUserGroup(user._id).then(response => setGroupList(response));
    console.log(groupList);
  }, [user]);
  console.log(groupList);
  useEffect(() => {
    if (voteType.value === 'free') {
      setFreeCategory(true);
      setGroupCategory(false);
    }
    if (voteType.value === 'group') {
      setFreeCategory(false);
      setGroupCategory(true);
      const groupOptions = [];
      groupList.forEach(item => {
        const object = {};
        // eslint-disable-next-line no-underscore-dangle
        object.value = item._id;
        object.label = item.name;
        groupOptions.push(object);
      });
      setSelectGroup(groupOptions);
    }
  }, [voteType, groupList]);
  useEffect(() => {
    if (user?.isAdmin) {
      setOptions(adminVote);
    }
    if (!user?.isAdmin) {
      setOptions(memberVote);
    }
  }, [user]);

  return (
    <div>
      <Selection>
        <S.Label>투표 종류</S.Label>
        <SelectItem>
          <Controller
            name="voteType"
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                options={options}
                placeholder="투표 종류를 선택해주세요."
                styles={customStyles}
              />
            )}
            control={control}
            defaultValue=""
          />
        </SelectItem>
      </Selection>
      {freecategory && (
        <Selection>
          <S.Label>카테고리</S.Label>
          <SelectItem>
            <Controller
              name="freeVoteCategory"
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={FreeVoteCategory}
                  placeholder="카테고리를 선택해주세요."
                  styles={customStyles}
                />
              )}
              control={control}
              defaultValue=""
            />
          </SelectItem>
        </Selection>
      )}
      {groupCategory && (
        <Selection>
          <S.Label>단체 명</S.Label>
          <SelectItem>
            <Controller
              name="groupVoteCategory"
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={selectGroup}
                  placeholder="단체 명을 선택해주세요."
                  styles={customStyles}
                />
              )}
              control={control}
              defaultValue=""
            />
          </SelectItem>
        </Selection>
      )}
    </div>
  );
}

const Selection = styled.section`
  display: flex;
  margin: 5vh 0;
  align-items: center;
  width: 100%;
  @media (max-width: ${media.tablet}px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const SelectItem = styled.div`
  width: 40%;
  @media (max-width: ${media.tablet}px) {
    width: 100%;
  }
`;

export default VoteType;
