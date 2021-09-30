import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import moment from 'moment';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import color from '../../../../../util/style/color';
import storage from '../../../../../util/storage';
import { deleteNotice, updateNotice } from '../../../../../actions/group_actions';
import useInput from '../../../../../hooks/useInput';

function NoticeItem({ title, writer, createdAt, description, noticeId, files }) {
  const user = storage.get('user');
  const history = useHistory();
  const dispatch = useDispatch();
  const [updateMode, setUpdateMode] = useState(false);
  const [updateText, onChangeUpdateText, setUpdateText] = useInput(description);
  const [updateTitle, onChangeUpdateTitle, setUpdateTitle] = useInput(title);

  const onChangeUpdateMode = () => {
    setUpdateMode(!updateMode);
  };
  const onCancel = () => {
    onChangeUpdateMode();
    setUpdateText(description);
    setUpdateTitle(title);
  };
  const onComplete = () => {
    onChangeUpdateMode();
    setUpdateText(updateText);
    setUpdateTitle(updateTitle);
    const body = {
      _id: noticeId,
      writer,
      title: updateTitle,
      description: updateText,
      files,
    };

    dispatch(updateNotice(body, noticeId));
  };
  const onDelete = () => {
    if (window.confirm('공지사항을 삭제하시겠습니까?')) {
      dispatch(deleteNotice(noticeId));
      history.goBack();
    }
  };

  return (
    <Container>
      <HeaderContainer>
        <FlexWrapper>
          {updateMode && <TitleInput value={updateTitle} onChange={onChangeUpdateTitle} />}
          {!updateMode && <Title>{updateTitle}</Title>}
          {/* eslint-disable-next-line no-underscore-dangle */}
          {user === writer._id && !updateMode && (
            <ButtonWrapper>
              <Button type="button" onClick={onChangeUpdateMode}>
                수정
              </Button>
              <Button type="button" onClick={onDelete}>
                삭제
              </Button>
            </ButtonWrapper>
          )}
          {/* eslint-disable-next-line no-underscore-dangle */}
          {user === writer._id && updateMode && (
            <ButtonWrapper>
              <Button type="button" onClick={onComplete}>
                확인
              </Button>
              <Button type="button" onClick={onCancel}>
                취소
              </Button>
            </ButtonWrapper>
          )}
        </FlexWrapper>
        <FlexWrapper>
          <WriterWrapper>
            {writer.image ? (
              <Img src={`http://localhost:5000/${writer.image}`} alt="멤버 사진" />
            ) : (
              <FaUserCircle size="30" color="#696868" style={{ marginRight: '10px' }} />
            )}
            {writer.name}
          </WriterWrapper>
          <div>{moment(createdAt).format('YYYY/MM/DD h:mm a')}</div>
        </FlexWrapper>
      </HeaderContainer>
      <ContentContainer>
        {updateMode && <Textarea rows={30} value={updateText} onChange={onChangeUpdateText} />}
        {!updateMode &&
          updateText.split('\n').map(line => (
            <ContentLine key={line}>
              {line}
              <br />
            </ContentLine>
          ))}
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  min-height: 75%;
`;
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${color.middleGray};
`;
const TitleInput = styled.input`
  font-size: 1.3rem;
  font-weight: bold;
`;
const Title = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1vh;
`;
const ButtonWrapper = styled.div`
  display: flex;
`;
const Button = styled.button`
  border: 1px solid ${color.middleGray};
  background-color: white;
  cursor: pointer;
  padding: 2px 15px;
`;
const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2vh 0;
`;
const WriterWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Img = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 50px;
`;
const ContentContainer = styled.div`
  margin-top: 2vh;
  min-height: 60%;
`;
const Textarea = styled.textarea`
  width: 100%;
  min-height: 100%;
`;
const ContentLine = styled.span`
  line-height: 30px;
`;
export default NoticeItem;
