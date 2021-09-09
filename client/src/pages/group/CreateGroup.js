import React from 'react';
import styled from 'styled-components';
import CreateGroupForm from '../../components/group/CreateGroupForm';
import media from '../../util/style/media';
import color from '../../util/style/color';

function CreateGroup() {
  return (
    <CreateGroupContainer>
      <Header>
        <h1>단체 만들기</h1>
        <Text>원하는 단체를 만들어보세요.</Text>
      </Header>
      <CreateGroupForm />
    </CreateGroupContainer>
  );
}

const CreateGroupContainer = styled.div`
  width: 650px;
  @media (max-width: ${media.tablet}px) {
    width: 80%;
  }
  margin: 13vh auto;
`;
const Header = styled.div`
  line-height: 1.7;
  font-family: 'Nanum Gothic Coding', sans-serif;
  font-size: 1.6rem;
  margin-bottom: 2vh;
`;
const Text = styled.div`
  font-size: 1rem;
  color: ${color.darkGray};
`;
export default CreateGroup;
