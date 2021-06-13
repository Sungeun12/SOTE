import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import axios from 'axios';
import * as S from './style';
import { groupCategory, joinPolicy } from '../../../util/selectOption/selectOption';
import { customStyles } from '../../vote/CreateVoteForm/style';
import ImageUpload from './ImageUpload';
import { createGroup } from '../../../actions/group_actions';
import storage from '../../../util/storage';

function CreateGroupForm() {
  const [image, setImage] = useState('');
  const [emailFile, setEmailFile] = useState('');

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const handleEmailChange = event => {
    if (event.target.files !== null) {
      const formData = new FormData();
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
      };
      formData.append('group', event.target.files[0]);
      axios.post('http://localhost:5000/group/upload', formData, config).then(response => {
        setEmailFile(response.data);
      });
    }
  };

  const onSubmit = data => {
    console.log(data, image);
    const manager = storage.get('user');
    const body = {
      manager,
      category: data.groupType.value,
      name: data.name,
      description: data.description,
      image,
      emailFile,
      joinPolicy: data.joinPolicy.value,
    };
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
      <S.Line />
      <S.EmailDesc>이메일 파일을 등록해 멤버를 추가하세요. (선택)</S.EmailDesc>
      <S.InputContainer>
        <S.Label>파일 등록</S.Label>
        <S.EmailInput id="group" type="file" accept=".csv" onChange={e => handleEmailChange(e)} />
      </S.InputContainer>
      <S.SubmitButton type="submit" value="단체 만들기" />
    </S.Form>
  );
}

export default CreateGroupForm;
