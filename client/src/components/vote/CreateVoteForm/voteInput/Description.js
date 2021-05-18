import React from 'react';
import { Controller } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import * as S from '../style';
import media from '../../../../util/style/media';

function Description({ control }) {
  return (
    <TextAreaContainer>
      <S.Label htmlFor="description">투표 설명</S.Label>
      <Controller
        control={control}
        name="description"
        defaultValue=""
        render={({ field }) => (
          <StyledTextArea {...field} placeholder="투표 설명을 입력해주세요." minRows={5} />
        )}
      />
    </TextAreaContainer>
  );
}

const TextAreaContainer = styled.div`
  display: flex;
  margin: 5vh 0;
  width: 100%;
  @media (max-width: ${media.tablet}px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const StyledTextArea = styled(TextareaAutosize)`
  resize: none;
  width: 70%;
  :: placeholder {
    color: '#838383';
    font-size: 0.8rem;
    padding-left: 7px;
    font-family: 'sans-serif';
  }
  border-radius: 4px;
  border: 1px solid #c2c2c2;
  @media (max-width: ${media.tablet}px) {
    width: 100%;
  }
`;

export default Description;
