import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import * as S from './style';
import { groupCategory, joinPolicy } from '../../../util/selectOption/selectOption';
import { customStyles } from '../../vote/CreateVoteForm/style';
import ImageUpload from './ImageUpload';
import { createGroup } from '../../../actions/group_actions';
import storage from '../../../util/storage';

function CreateGroupForm() {
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = data => {
    console.log(data, image);
    const manager = storage.get('user');
    const body = {
      manager,
      category: data.groupType.value,
      name: data.name,
      description: data.description,
      image,
      joinPolicy: data.joinPolicy.value,
    };
    console.log(body);
    dispatch(createGroup(body));
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <S.Selection>
        <S.Label>단체 종류</S.Label>
        <S.SelectItem>
          <Controller
            name="groupType"
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
        </S.SelectItem>
      </S.Selection>
      <S.Selection>
        <S.Label>가입 방식</S.Label>
        <S.SelectItem>
          <Controller
            name="joinPolicy"
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                options={joinPolicy}
                placeholder="단체 가입 방식을 선택해주세요."
                styles={customStyles}
              />
            )}
            control={control}
            defaultValue=""
          />
        </S.SelectItem>
      </S.Selection>
      <S.InputContainer>
        <S.Label htmlFor="name">단체 이름</S.Label>
        <S.Input
          id="name"
          type="text"
          {...register('name', { required: true, maxLength: 30 })}
          placeholder="단체 이름을 입력해주세요."
        />
      </S.InputContainer>
      {errors.name && errors.name.type === 'required' && (
        <S.ErrorMessage>이름을 입력해주세요.</S.ErrorMessage>
      )}
      {errors.name && errors.name.type === 'pattern' && (
        <S.ErrorMessage>
          한글은 2~6자, 영문은 2~10자 firstname Lastname 형식으로 입력해주세요.
        </S.ErrorMessage>
      )}
      <S.InputContainer>
        <S.Label htmlFor="img">단체 사진</S.Label>
        <ImageUpload image={image} setImage={setImage} />
      </S.InputContainer>
      <S.TextAreaContainer>
        <S.Label htmlFor="description">단체 소개</S.Label>
        <Controller
          control={control}
          name="description"
          defaultValue=""
          render={({ field }) => (
            <S.StyledTextArea {...field} placeholder="단체 소개를 입력해주세요." minRows={10} />
          )}
        />
      </S.TextAreaContainer>
      <S.SubmitButton type="submit" value="단체 만들기" />
    </S.Form>
  );
}

export default CreateGroupForm;
