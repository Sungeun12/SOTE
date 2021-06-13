import React from 'react';
import styled from 'styled-components';
import { MdPersonOutline } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as api from '../../../api/group';

function GroupItem({ description, name, members, image, id }) {
  const history = useHistory();
  const join = true;
  // eslint-disable-next-line no-underscore-dangle
  const userId = useSelector(state => state.user.user._id);
  console.log(description);
  const onClick = () => {
    if (join) {
      history.push(`/group/${id}/home`);
    } else {
      alert('그룹 멤버가 아닙니다.');
    }
  };
  const handleJoin = () => {
    if (userId) {
      api.joinGroup(id, userId).then(response => console.log(response));
    }
  };
  return (
    <ItemContainer>
      <Img src={`http://localhost:5000/${image}`} alt={image} onClick={onClick} />
      <TitleWrapper>
        <Name onClick={onClick}>{name}</Name>
        <Button type="button" value="가입" onClick={handleJoin} />
      </TitleWrapper>
      <Number>
        <MdPersonOutline size={20} style={{ marginRight: '5px' }} /> {members.length} 명
      </Number>
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  cursor: pointer;
  text-decoration: none;
  color: black;
`;
const Img = styled.img`
  width: 300px;
  height: 200px;
`;
const TitleWrapper = styled.div`
  margin-top: 1vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Nanum Gothic Coding', sans-serif;
`;
const Name = styled.div`
  font-size: 1rem;
`;
const Button = styled.input`
  width: 80px;
  height: 30px;
  cursor: pointer;
  background-color: white;
  border: 1px solid;
  text-align: center;
  font-family: 'Nanum Gothic Coding', sans-serif;
`;

const Number = styled.div`
  display: flex;
  align-items: center;
`;
export default GroupItem;
