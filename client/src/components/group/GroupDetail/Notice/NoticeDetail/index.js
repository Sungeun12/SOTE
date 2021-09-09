import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { loadIdNotice, unloadGroupNotice } from '../../../../../actions/group_actions';
import color from '../../../../../util/style/color';
import NoticeItem from './NoticeItem';

function NoticeDetail({ match }) {
  const { uid } = match.params;
  const dispatch = useDispatch();
  const notice = useSelector(state => state.group?.currentNotice?.notice);
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    dispatch(loadIdNotice(uid));
    return () => {
      dispatch(unloadGroupNotice());
    };
  }, [dispatch, uid]);

  return (
    <div style={{ height: '100%' }}>
      {notice && (
        <Container>
          <NoticeItem
            title={notice.title}
            writer={notice.writer}
            createdAt={notice.createdAt}
            description={notice.description}
            newContent={newContent}
            setNewContent={setNewContent}
          />
          <FileWrapper>
            <FileLabel>첨부파일</FileLabel>
            <FileName href={`http://localhost:5000/${notice.files[0]}`} download>
              {notice.files[0]}
            </FileName>
          </FileWrapper>
        </Container>
      )}
    </div>
  );
}

const Container = styled.div`
  width: 80%;
  margin: 4vh auto 2vh;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const FileWrapper = styled.div`
  margin: 2vh 0;
  display: flex;
  align-items: center;
  border: 1px solid ${color.middleGray};
  padding: 2vh 1vw;
`;
const FileLabel = styled.div`
  background-color: ${color.middleGray};
  color: white;
  padding: 3px;
`;
const FileName = styled.a`
  color: black;
  margin-left: 10px;
`;
export default NoticeDetail;
