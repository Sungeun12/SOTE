import React, { useState } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import * as api from '../../../../api/group';
import useInput from '../../../../hooks/useInput';
import color from '../../../../util/style/color';
import storage from '../../../../util/storage';

function CreateNoticeModal({ toggleModal, id }) {
  const [title, onChangeTitle] = useInput('');
  const [description, onChangeDescription] = useInput('');
  const [file, setFile] = useState([]);

  const handleFileChange = async event => {
    if (event.target.files !== null) {
      const formData = new FormData();
      formData.append('group', event.target.files[0]);
      const response = await api.uploadFile(formData);
      setFile(file.append(response.data.filepath));
    }
  };

  const onSubmit = async () => {
    const writer = storage.get('user');
    const body = {
      writer,
      title,
      description,
      files: file,
    };
    await api.createNotice(body, id);
    toggleModal();
  };
  return (
    <Dimmer>
      <Container>
        <CloseWrapper>
          <MdClose size={25} color="black" onClick={toggleModal} />
        </CloseWrapper>
        <Title>공지사항 글쓰기</Title>
        <Label>제목</Label>
        <Input
          type="text"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={onChangeTitle}
        />
        <Label>내용</Label>
        <textarea
          type="description"
          placeholder="내용을 입력해주세요."
          value={description}
          onChange={onChangeDescription}
          rows={10}
        />
        <Label htmlFor="file">파일 올리기</Label>
        <FileInput
          id="group"
          type="file"
          accept=".docx,.pdf,text/plain"
          onChange={e => handleFileChange(e)}
        />
        <SubmitButton onClick={onSubmit}>등록</SubmitButton>
      </Container>
    </Dimmer>
  );
}

const Dimmer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #00000080;
  z-index: 100;
`;
const CloseWrapper = styled.div`
  margin: 2vh 0 2vh auto;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 60vw;
  height: 80vh;
  margin: 12vh auto;
  background-color: white;
  z-index: 99;
  box-shadow: 0px 1px 1px rgba(15, 15, 15, 0.2);
  padding: 0 30px;
  border-radius: 5px;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
  margin: 1vh 0;
`;
const Label = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #838383;
  margin: 2vh 0;
`;
const Input = styled.input`
  height: 30px;
`;
const FileInput = styled.input`
  height: 30px;
  border: 1px solid ${color.gray};
  padding: 5px 3px;
`;
const SubmitButton = styled.button`
  height: 40px;
  width: 130px;
  margin-left: auto;
  background-color: ${color.skyBlue};
  border: none;
  cursor: pointer;
  margin-top: 20px;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 10px;
  color: white;
  :hover {
    opacity: 0.9;
  }
`;
export default CreateNoticeModal;
