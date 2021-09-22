import React from 'react';
import styled from 'styled-components';
import { textData } from '../../components/mypage/NavBar/textData';
import NavBar from '../../components/mypage/NavBar';
import media from '../../util/style/media';

function Collections() {
  return (
    <Container>
      <NavBar data={textData} />
      collection
    </Container>
  );
}
const Container = styled.div`
  width: 90%;
  @media (max-width: ${media.tablet}px) {
    width: 90%;
  }
  margin: 13vh auto;
`;
export default Collections;
