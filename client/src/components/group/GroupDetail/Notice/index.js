import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import color from '../../../../util/style/color';
import CreateNoticeModal from './CreateNoticeModal';
import NoticeList from './NoticeList';
import Loading from '../../../common/Loading';

function Notice({ id }) {
  const notices = useSelector(state => state.group.notices);
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = () => {
    setOpenModal(!openModal);
  };
  const request = useSelector(state => state.group.request);

  if (request) {
    return <Loading />;
  }
  return (
    <Container>
      <TitleWrapper>
        <Title>공지사항</Title>
        <Button type="button" onClick={toggleModal}>
          글쓰기
        </Button>
        {openModal && <CreateNoticeModal toggleModal={toggleModal} id={id} />}
      </TitleWrapper>
      {notices && <NoticeList data={notices} id={id} />}
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
  justify-content: space-between;
`;
const Title = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  margin: 5vh 0;
`;
const Button = styled.button`
  border: none;
  background-color: ${color.skyBlue};
  color: white;
  width: 100px;
  height: 35px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  :hover {
    opacity: 0.9;
  }
`;
export default Notice;
