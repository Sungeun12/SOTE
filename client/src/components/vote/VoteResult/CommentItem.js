import React from 'react';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import { BiLike } from 'react-icons/bi';
import moment from 'moment';
import color from '../../../util/style/color';

function CommentItem({ writer, text, date }) {
  const strDate = moment(date).format('YYYY/MM/DD h:mm a');

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
        <div>
          <Button type="button" value="수정" style={{ marginRight: '10px' }} />
          <Button type="button" value="삭제" />
        </div>
      </TopWrapper>
      <Text>{text}</Text>
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
  height: 150px;
  width: 90%;
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
