import React from 'react';
import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import TextareaAutosize from 'react-textarea-autosize';
import * as S from '../../SignUpForm/style';
import media from '../../../util/style/media';
import { groupCategory } from '../../../util/selectOption/selectOption';
import { customStyles } from '../../CreateVote/style';
import Image from './Image';
import color from '../../../util/style/color';

function CreateGroupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const onSubmit = values => console.log(values);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Selection>
        <Label>단체 종류</Label>
        <SelectItem>
          <Controller
            name="voteType"
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                options={groupCategory}
                placeholder="단체 종류를 선택해주세요."
                styles={customStyles}
              />
            )}
            control={control}
            defaultValue=""
          />
        </SelectItem>
      </Selection>
      <InputContainer>
        <Label htmlFor="name">단체 이름</Label>
        <Input
          id="name"
          type="text"
          {...register('name', { required: true, maxLength: 30 })}
          placeholder="단체 이름을 입력해주세요."
        />
      </InputContainer>
      {errors.name && errors.name.type === 'required' && (
        <S.ErrorMessage>이름을 입력해주세요.</S.ErrorMessage>
      )}
      {errors.name && errors.name.type === 'pattern' && (
        <S.ErrorMessage>
          한글은 2~6자, 영문은 2~10자 firstname Lastname 형식으로 입력해주세요.
        </S.ErrorMessage>
      )}
      <InputContainer>
        <Label htmlFor="img">단체 사진</Label>
        <Image />
      </InputContainer>
      <TextAreaContainer>
        <Label htmlFor="description">단체 소개</Label>
        <Controller
          control={control}
          name="description"
          defaultValue=""
          render={({ field }) => (
            <StyledTextArea {...field} placeholder="단체 소개를 입력해주세요." minRows={10} />
          )}
        />
      </TextAreaContainer>
      <SubmitButton type="submit" value="단체 만들기" />
    </Form>
  );
}

const Form = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
const InputContainer = styled.div`
  display: flex;
  margin: 3vh 0;
  align-items: center;
  width: 100%;
  @media (max-width: ${media.tablet}px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const Label = styled.label`
  font-family: 'Nanum Gothic Coding', monospace;
  font-size: 1.2rem;
  width: 20%;
  @media (max-width: ${media.tablet}px) {
    margin-bottom: 3.5vh;
  }
`;
const Input = styled.input`
  width: 80%;
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
const Selection = styled.section`
  display: flex;
  margin: 3vh 0;
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
const TextAreaContainer = styled.div`
  display: flex;
  margin: 3vh 0;
  width: 100%;
  @media (max-width: ${media.tablet}px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const StyledTextArea = styled(TextareaAutosize)`
  resize: none;
  width: 80%;
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
const SubmitButton = styled.input`
  font-family: 'Nanum Gothic Coding', monospace;
  width: 50%;
  height: 50px;
  margin: 5vh auto;
  text-align: center;
  background-color: ${color.navy};
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid;
  border-color: none;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  opacity: 0.9;
  :hover {
    opacity: 1;
  }
  @media (max-width: ${media.tablet}px) {
    width: 100%;
  }
`;
export default CreateGroupForm;
