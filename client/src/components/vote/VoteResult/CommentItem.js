import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { BiLike } from 'react-icons/bi';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import color from '../../../util/style/color';
import storage from '../../../util/storage';
import useInput from '../../../hooks/useInput';
import { deleteComment, updateComment } from '../../../actions/vote_actions';

function CommentItem({ writer, text, date, commentId, isDeleted }) {
  const strDate = moment(date).format('YYYY/MM/DD h:mm a');
  const user = storage.get('user');
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  const [updateText, onChangeUpdateText, setUpdateText] = useInput(text);
  const handleCancel = () => {
    setUpdate(false);
    setUpdateText(text);
  };
  const handleComplete = () => {
    setUpdate(false);
    setUpdateText(updateText);
    dispatch(updateComment(commentId, updateText));
  };
  const handleDelete = () => {
    dispatch(deleteComment(commentId));
  };
  return (
    <Container>
      <TopWrapper>
        <User>
          {writer.img ? (
            <Img src={writer.img} alt={writer.img} />
          ) : (
            <FaUserCircle size="50" color="#696868" style={{ marginRight: '10px' }} />
          )}
          <ul>
            <Name>{writer.name}</Name>
            <li>{strDate}</li>
          </ul>
        </User>
        {/* eslint-disable-next-line no-underscore-dangle */}
        {writer._id === user &&
          !isDeleted &&
          (update ? (
            <div>
              <Button
                type="button"
                value="완료"
                style={{ marginRight: '10px' }}
                onClick={handleComplete}
              />
              <Button type="button" value="취소" onClick={handleCancel} />
            </div>
          ) : (
            <div>
              <Button
                type="button"
                value="수정"
                style={{ marginRight: '10px' }}
                onClick={() => setUpdate(true)}
              />
              <Button type="button" value="삭제" onClick={handleDelete} />
            </div>
          ))}
      </TopWrapper>
      {update && !isDeleted && (
        <TextArea type="text" value={updateText} onChange={onChangeUpdateText} />
      )}
      {!update && !isDeleted && (
        <Text>
          {updateText.split('\n').map(line => (
            <div>
              {line}
              <br />
            </div>
          ))}
        </Text>
      )}
      {isDeleted && <div>삭제된 댓글입니다.</div>}
      <BottomWrapper>
        <ReplyWrapper>
          <AiOutlinePlusSquare color={`${color.navy}`} size={25} />
          <Reply type="button" value="답글 작성" />
        </ReplyWrapper>
        <ReplyWrapper>
          <BiLike size={25} style={{ marginRight: '10px' }} />
          <div>0개</div>
        </ReplyWrapper>
      </BottomWrapper>
      <Line />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  margin: 2vh auto;
  font-family: 'Nanum Gothic', monospace;
`;
const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const User = styled.div`
  display: flex;
  align-items: center;
  line-height: 25px;
`;
const Name = styled.li`
  font-family: 'Nanum Gothic Coding', monospace;
  font-size: 1rem;
`;

const Img = styled.img`
  width: 50px;
  border-radius: 50%;
`;
const Text = styled.div`
  font-size: 1.2rem;
  line-height: 25px;
`;
const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;
const Line = styled.div`
  margin: 3vh 0;
  width: 100%;
  border-bottom: 1px solid ${color.gray};
  opacity: 0.3;
`;
const Button = styled.input`
  width: 45px;
  background-color: ${color.middleGray};
  border: none;
  height: 25px;
  border-radius: 20px;
  color: white;
  font-size: 0.8rem;
  font-family: 'Nanum Gothic Coding', monospace;
  cursor: pointer;
`;
const TextArea = styled.textarea`
  width: 80%;
  height: 100px;
`;
const ReplyWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const Reply = styled.input`
  font-size: 1.2rem;
  font-family: 'Nanum Gothic Coding', monospace;
  background-color: white;
  border: none;
  color: ${color.navy};
  cursor: pointer;
`;

export default CommentItem;
