import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { textData } from '../../components/mypage/NavBar/textData';
import NavBar from '../../components/mypage/NavBar';
import media from '../../util/style/media';
import storage from '../../util/storage';
import { loadUserGroup } from '../../actions/myPage_action';
import GroupItem from '../../components/group/GroupList/GroupItem';

function MyGroup() {
  const userId = storage.get('user');
  const request = useSelector(state => state.myPage.request);
  const error = useSelector(state => state.myPage.error);
  const myGroup = useSelector(state => state.myPage.myGroup);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUserGroup(userId));
  }, [dispatch]);

  return (
    <Container>
      <NavBar data={textData} />
      {request && <Text>loading...</Text>}
      {error && <Text>{error}</Text>}
      {!request && myGroup && myGroup.length === 0 && <Text>가입한 단체가 없습니다.</Text>}
      <GroupContainer>
        {!request &&
          myGroup &&
          myGroup.map(({ description, members, name, image, _id, managers }) => (
            <GroupItem
              key={name}
              description={description}
              members={members}
              name={name}
              image={image}
              id={_id}
              managers={managers}
              myPage
            />
          ))}
      </GroupContainer>
    </Container>
  );
}
const Container = styled.div`
  width: 90%;
  height: 100vh;
  @media (max-width: ${media.tablet}px) {
    width: 90%;
  }
  margin: 13vh auto;
`;
const Text = styled.div`
  margin: 5vh 0;
  text-align: center;
`;
const GroupContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 6vh;
  column-gap: 4.5vw;
  margin-top: 5vh;
`;
export default MyGroup;
