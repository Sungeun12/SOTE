import React from 'react';
import styled from "styled-components";
import * as S from "../style";
import media from "../../../util/style/media";

function Title({ register }) {

    return (
        <InputContainer>
            <S.Label htmlFor="title">투표 명</S.Label>
            <Input
                id="title"
                type="text"
                {...register('title', { required: true, maxLength: 30 })}
                placeholder="투표 명을 입력해주세요."
            />
        </InputContainer>
    );
}

const InputContainer = styled.div`
  display: flex;
  margin: 5vh 0;
  align-items: center;
  width: 100%;
    @media (max-width: ${media.tablet}px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Input = styled.input`
  width: 70%;
  height: 45px;
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
export default Title;