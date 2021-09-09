import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';
import { RiShieldStarLine } from 'react-icons/ri';
import { MdMoreVert } from 'react-icons/md';
import color from '../../../../util/style/color';
import { useOnClickOutside } from '../../../../hooks/useOnClickOutside';

function MemberItem({ name, image, manager, waiting, auth }) {
  const ref = useRef();
  const [openMenu, setOpenMenu] = useState(false);
  const onClickOpenMenu = () => {
    setOpenMenu(!openMenu);
  };
  useOnClickOutside(ref, () => setOpenMenu(false));
  return (
    <Container>
      <UserWrapper>
        {image ? (
          <Img src={image} alt="멤버 사진" />
        ) : (
          <FaUserCircle size="30" color="#696868" style={{ marginRight: '50px' }} />
        )}

        <div>{name}</div>
        {manager && (
          <ManagerWrapper>
            <ManagerLabel>관리자</ManagerLabel>
            <RiShieldStarLine size={25} style={{ marginLeft: '10px' }} color="#213E70" />
          </ManagerWrapper>
        )}
      </UserWrapper>
      {auth && waiting && <Button type="button">승인</Button>}
      {auth && !waiting && (
        <ButtonWrapper>
          <Button type="button">강퇴</Button>
          <MdMoreVert size={20} onClick={onClickOpenMenu} />
          {manager && openMenu && <DropDownContainer ref={ref}>관리자 삭제</DropDownContainer>}
          {!manager && openMenu && <DropDownContainer ref={ref}>관리자로 추가</DropDownContainer>}
        </ButtonWrapper>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  margin: 0 auto;
  justify-content: space-between;
  border: 1px solid ${color.middleGray};
  padding: 2vh 2vw;
`;
const UserWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Img = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 50px;
`;
const ManagerWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const ManagerLabel = styled.div`
  background-color: ${color.middleGray};
  margin-left: 10px;
  font-size: 0.8rem;
  color: white;
  padding: 5px 5px;
`;
const Button = styled.button`
  cursor: pointer;
  background-color: ${color.middleGray};
  border: none;
  width: 80px;
  height: 30px;
  color: white;
  border-radius: 20px;
  font-family: 'Nanum Gothic Coding', monospace;
  font-size: 0.8rem;
  :hover {
    opacity: 0.9;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;
const DropDownContainer = styled.div`
  position: absolute;
  background-color: white;
  text-align: center;
  right: 0px;
  top: 0px;
  border: 1px solid ${color.middleGray};
  box-shadow: 0px 1px 1px rgba(15, 15, 15, 0.2);
  height: 30px;
  line-height: 30px;
  width: 120px;
  z-index: 1;
  font-family: 'Nanum Gothic', monospace;
  :hover {
    background-color: ${color.lightGray};
  }
`;
export default MemberItem;
