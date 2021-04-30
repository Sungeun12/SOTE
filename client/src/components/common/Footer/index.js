import React from 'react';
import styled from 'styled-components';
import { AiOutlineGithub, AiOutlineInstagram } from 'react-icons/ai';
import { FaFacebook } from 'react-icons/fa';
import { footerData } from './footerData';
import media from '../../../util/style/media';

function Footer() {
  return (
    <FooterContainer>
      <Wrapper>
        <Name>SOTE</Name>
        <SnsIcon>
          <AiOutlineGithub size="28" style={{ marginRight: '1vw' }} />
          <FaFacebook size="27" style={{ marginRight: '1vw' }} />
          <AiOutlineInstagram size="28" />
        </SnsIcon>
      </Wrapper>
      <ul>
        {footerData.map(({ text }) => (
          <FooterItem key={text}>{text}</FooterItem>
        ))}
      </ul>

      <CopyRight>Copyright 2021 SOTE, Team WEB, All rights reserved</CopyRight>
    </FooterContainer>
  );
}

const FooterContainer = styled.div`
  font-family: 'Do Hyeon', sans-serif;
  color: #696868;
  background: #f2f1f1;
  height: 250px;
  padding: 5vh 4.5vw 0 4.5vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const Name = styled.div`
  font-weight: 600;
  font-size: 30px;
`;
const FooterItem = styled.li`
  cursor: pointer;
  margin: 1.5vh 0;
  font-weight: 500;
  font-family: 'Nanum Gothic', sans-serif;
`;
const SnsIcon = styled.div``;
const CopyRight = styled.div`
  font-weight: 500;
  margin-bottom: 3vh;
  @media (max-width: ${media.tablet}px) {
    font-size: 15px;
  }
  font-family: 'Nanum Gothic', sans-serif;
`;
export default Footer;
