import React from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import { MdPersonOutline } from 'react-icons/md';
import MemberItem from '../Manage/MemberItem';

function Member() {
  const group = useSelector(state => state.group.currentGroup);

  return (
    <Container>
      <TitleWrapper>
        <Title>단체 멤버</Title>
        <NumberWrapper>
          <MdPersonOutline size={25} style={{ marginRight: '2px' }} />
          {group && group?.members.length + group?.managers.length}
        </NumberWrapper>
      </TitleWrapper>
      {group?.managers.map(({ image, name, _id }) => (
        <MemberItem profile={image} name={name} key={_id} manager auth={false} waiting={false} />
      ))}
      {group?.members.map(({ image, name, _id }) => (
        <MemberItem profile={image} name={name} key={_id} manager={false} auth={false} />
      ))}
    </Container>
  );
}

const Container = styled.div`
  margin: 20px auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  font-family: 'Nanum Gothic', monospace;
  font-size: 1rem;
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  margin: 5vh 0;
`;
const Title = styled.div`
  font-weight: bold;
  margin-right: 10px;
`;
const NumberWrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
`;
export default Member;
