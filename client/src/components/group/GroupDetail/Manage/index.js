import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import user from './user.json';
import color from '../../../../util/style/color';
import MemberItem from './MemberItem';

function Manage() {
  const [emailFile, setEmailFile] = useState('');
  console.log(emailFile);
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

  return (
    <ManageContainer>
      <Title>멤버 관리</Title>
      <Label htmlFor="email">멤버 이메일 파일 올리기</Label>
      <InputWrapper>
        <Input id="group" type="file" accept=".csv" onChange={e => handleEmailChange(e)} />
        <Button type="button" value="수정하기" />
      </InputWrapper>
      <Label>새 멤버 추가하기</Label>
      <InputWrapper>
        <Name type="text" placeholder="이름" />
        <Email type="email" placeholder="이메일" />
        <Button type="button" value="등록하기" />
      </InputWrapper>
      <Label>멤버 목록</Label>
      {user.data.map(({ profile, name, id }) => (
        <MemberItem profile={profile} name={name} key={id} />
      ))}
    </ManageContainer>
  );
}

const ManageContainer = styled.div`
  margin: 0 auto;
  width: 70%;
  display: flex;
  flex-direction: column;
  font-family: 'Nanum Gothic Coding', monospace;
`;
const Title = styled.div`
  text-align: center;
  font-size: 1.5rem;
  margin: 7vh 0;
`;
const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3vh;
`;
const Label = styled.label`
  width: 50%;
  font-size: 1.2rem;
  margin-bottom: 2vh;
`;
const Input = styled.input`
  width: 75%;
  border: 1px solid ${color.gray};
  padding: 10px 0;
`;
const Name = styled.input`
  width: 20%;
  padding: 14px 0;
  border: 1px solid ${color.gray};
`;
const Email = styled.input`
  width: 50%;
  border: 1px solid ${color.gray};
`;

const Button = styled.input`
  width: 20%;
  background-color: #c4c4c4;
  color: white;
  border: none;
  cursor: pointer;
  font-family: 'Nanum Gothic Coding', monospace;
  font-size: 1rem;
`;
export default Manage;
