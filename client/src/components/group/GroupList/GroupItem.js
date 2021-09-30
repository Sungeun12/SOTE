import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdPersonOutline } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as api from '../../../api/group';
import color from '../../../util/style/color';
import { leaveUserGroup } from '../../../actions/myPage_action';
import storage from '../../../util/storage';

function GroupItem({ description, name, members, image, id, managers, myPage }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [join, setJoin] = useState(false);
  const [manage, setManage] = useState(false);
  const [memeberNum, setMemberNum] = useState(members.length + managers.length);
  // eslint-disable-next-line no-underscore-dangle
  const userId = storage.get('user');
  useEffect(() => {
    if (userId) {
      if (managers.includes(userId)) {
        setJoin(true);
        setManage(true);
        return;
      }
      setJoin(members.includes(userId));
    }
  }, [userId]);
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
      api.joinGroup(id, userId).then(response => {
        if (!response.data.success) {
          alert('그룹 가입 신청에 실패했습니다.');
        }
        if (response.data.result === 'joined') {
          alert('그룹에 가입되었습니다.');
          setJoin(true);
          setMemberNum(memeberNum + 1);
        }
        if (response.data.result === 'wait') {
          alert('그룹 가입 신청이 완료되었습니다. 승인이 완료된 후 가입됩니다.');
        }
      });
    }
  };
  const handleSecession = () => {
    if (window.confirm('정말 그룹에 탈퇴하시겠습니까?')) {
      dispatch(leaveUserGroup(id, userId));
    }
  };
  return (
    <ItemContainer>
      <Img src={`http://localhost:5000/${image}`} alt={image} onClick={onClick} />
      <TitleWrapper>
        <Name onClick={onClick}>{name}</Name>
        {manage ? <Manager>관리자</Manager> : ''}
        {join ? '' : <Button type="button" value="가입" onClick={handleJoin} />}
      </TitleWrapper>
      <BottomWrapper>
        <Number>
          <MdPersonOutline size={20} style={{ marginRight: '5px' }} /> {memeberNum}명
        </Number>
        {myPage && <Button type="button" value="탈퇴" onClick={handleSecession} />}
      </BottomWrapper>
    </ItemContainer>
  );
}

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  margin-bottom: 1vh;
  text-decoration: none;
  color: black;
  width: 300px;
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
  height: 30px;
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
const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Number = styled.div`
  display: flex;
  align-items: center;
`;
const Manager = styled.div`
  font-family: 'Nanum Gothic', sans-serif;
  background-color: ${color.middleGray};
  color: white;
  width: 70px;
  text-align: center;
  border-radius: 20px;
  height: 25px;
  line-height: 25px;
`;
export default GroupItem;
