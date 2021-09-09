import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import MemberItem from './MemberItem';

function ManageWaiting() {
  const group = useSelector(state => state.group.currentGroup);
  return (
    <Container>
      {group?.waitinglist.length === 0 && <Text>대기 목록이 없습니다.</Text>}
      {group?.waitinglist.map(({ image, name, _id }) => (
        <MemberItem profile={image} name={name} key={_id} waiting auth />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;
const Text = styled.div`
  text-align: center;
`;
export default ManageWaiting;
