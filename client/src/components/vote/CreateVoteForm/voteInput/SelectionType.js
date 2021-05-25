import React from 'react';
import styled from 'styled-components';
import * as S from '../style';
import singleSelection from '../../../../img/singleSelection.png';
import multiSelection from '../../../../img/multiSelection.png';

function SelectionType({ register }) {
  return (
    <LadioContainer>
      <S.LabelColumn>투표 방식 선택</S.LabelColumn>
      <LadioItemWrapper>
        <LadioItem>
          <Img alt="single" src={singleSelection} />
          <LadioInput>
            단일 선택
            <input
              type="radio"
              value="0"
              {...register('selectionType', { required: true })}
              style={{ transform: 'scale(1.3)', marginLeft: '10px' }}
            />
          </LadioInput>
        </LadioItem>

        <LadioItem>
          <Img alt="multi" src={multiSelection} />
          <LadioInput>
            복수 선택
            <input
              type="radio"
              value="1"
              {...register('selectionType', { required: true })}
              style={{ transform: 'scale(1.3)', marginLeft: '10px' }}
            />
          </LadioInput>
        </LadioItem>
      </LadioItemWrapper>
    </LadioContainer>
  );
}

const LadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5vh 0;
  width: 100%;
`;

const LadioItemWrapper = styled.div`
  display: flex;
`;
const LadioItem = styled.div`
  width: 50%;
  text-align: center;
`;
const LadioInput = styled.div`
  font-family: 'sans-serif';
  font-size: 1rem;
`;
export const Img = styled.img`
  width: 70px;
  height: 90px;
  margin-bottom: 10px;
`;
export default SelectionType;
