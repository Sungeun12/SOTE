import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import color from '../../../util/style/color';
import storage from '../../../util/storage';
import { uploadComment } from '../../../actions/vote_actions';
import CommentItem from './CommentItem';

function Comment({ comments, id }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  console.log(comments);
  const onChangeComment = e => {
    setComment(e.target.value);
  };
  const addComment = () => {
    const body = {
      writer: storage.get('user'),
      text: comment,
    };
    dispatch(uploadComment(id, body)).then(() => {
      setComment('');
    });
  };

  return (
    <Container>
      <TitleWrapper>
        <Title>댓글</Title>
        <Number>{comments.filter(({ isDeleted }) => isDeleted === false).length}개의 댓글</Number>
      </TitleWrapper>
      <Textarea
        placeholder="댓글을 입력해주세요."
        minRows={8}
        value={comment}
        onChange={e => onChangeComment(e)}
      />
      <CommentButton type="button" value="댓글 작성" onClick={addComment} />
      <Line />
      {comments &&
        comments.map(({ text, _id, createdAt, writer, isDeleted }) => (
          <CommentItem
            key={_id}
            commentId={_id}
            text={text}
            date={createdAt}
            writer={writer}
            isDeleted={isDeleted}
          />
        ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const TitleWrapper = styled.div`
  font-family: 'Nanum Gothic Coding', monospace;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.div`
  width: 100px;
  border: 2px solid ${color.navy};
  border-radius: 5px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin-bottom: 3vh;
`;
const Number = styled.div`
  height: 40px;
  font-family: 'Nanum Gothic', monospace;
`;

const Textarea = styled(TextareaAutosize)`
  resize: none;
  width: 100%;
  font-family: 'Nanum Gothic', monospace;
  font-size: 1rem;
`;
const CommentButton = styled.input`
  margin: 2vh 0 0 auto;
  font-family: 'Nanum Gothic Coding', monospace;
  width: 150px;
  height: 50px;
  text-align: center;
  background-color: ${color.navy};
  padding: 8px 10px;
  border-radius: 5px;
  border: 1px solid;
  border-color: none;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  opacity: 0.9;
  :hover {
    opacity: 1;
  }
`;
const Line = styled.div`
  margin: 3vh 0;
  width: 100%;
  border-bottom: 1px solid ${color.gray};
  opacity: 0.3;
`;
export default Comment;
