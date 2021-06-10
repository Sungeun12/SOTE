import React from 'react';
import styled from 'styled-components';
import { MdPersonOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';

function GroupItem({ description, name, members, image, id }) {
  console.log(description);
  return (
    <ItemContainer to={`/group/${id}/home`}>
      <Img src={`http://localhost:5000/${image}`} alt={image} />
      <TitleWrapper>
        <Name>{name}</Name>
        <Button type="button" value="가입" />
      </TitleWrapper>
      <Number>
        <MdPersonOutline size={20} style={{ marginRight: '5px' }} /> {members.length} 명
      </Number>
    </ItemContainer>
  );
}

const ItemContainer = styled(Link)`
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
