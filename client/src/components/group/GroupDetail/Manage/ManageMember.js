import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import axios from 'axios';
import MemberItem from './MemberItem';
import color from '../../../../util/style/color';

function ManageMember() {
  const group = useSelector(state => state.group.currentGroup);

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
    <Container>
      <Label htmlFor="email">멤버 이메일 파일 올리기</Label>
      <InputWrapper>
        <Input id="group" type="file" accept=".csv" onChange={e => handleEmailChange(e)} />
        <Button type="button" value="수정" />
      </InputWrapper>
      <Label>새 멤버 추가하기</Label>
      <InputWrapper>
        <Name type="text" placeholder="이름" />
        <Email type="email" placeholder="이메일" />
        <Button type="button" value="등록" />
      </InputWrapper>
      <FlexWrapper />
      <Label>멤버 목록</Label>
      <MemberList>
        {group?.managers.map(({ image, name, _id }) => (
          <MemberItem profile={image} name={name} key={_id} manager auth />
        ))}
        {group?.members.map(({ image, name, _id }) => (
          <MemberItem profile={image} name={name} key={_id} manager={false} auth />
        ))}
      </MemberList>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3vh;
`;
const FlexWrapper = styled.div`
  display: flex;
`;
const Label = styled.label`
  width: 100%;
  font-size: 1.2rem;
  margin-bottom: 3vh;
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
  background-color: ${color.skyBlue};
  color: white;
  border: none;
  cursor: pointer;
  font-family: 'Nanum Gothic Coding', monospace;
  font-size: 1rem;
  border-radius: 5px;
  :hover {
    opacity: 0.9;
  }
`;
const MemberList = styled.div`
  overflow-y: scroll;
  min-height: 50%;
`;
export default ManageMember;
