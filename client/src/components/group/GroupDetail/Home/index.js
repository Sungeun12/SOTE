import React from 'react';
import styled from 'styled-components';
import { BsPlus } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import NoticeList from '../Notice/NoticeList';
import VoteList from '../GroupVote/VoteList';
import { getDday } from '../../../../util/getDday';
import Loading from '../../../common/Loading';

function Home({ id }) {
  const history = useHistory();
  const notices = useSelector(state => state.group.notices.slice(0, 4));
  const votes = useSelector(state => state.group.votes);
  const request = useSelector(state => state.group.request);

  if (request) {
    return <Loading />;
  }
  return (
    <Container>
      <div style={{ height: '50%' }}>
        <TitleWrapper>
          <Title>공지사항</Title>
          <PlusWrapper onClick={() => history.push(`/group/${id}/notice`)}>
            <div>더보기</div>
            <BsPlus size={25} />
          </PlusWrapper>
        </TitleWrapper>
        {notices && <NoticeList data={notices} id={id} />}
      </div>
      <TitleWrapper>
        <Title>진행중인 투표</Title>
        <PlusWrapper onClick={() => history.push(`/group/${id}/vote`)}>
          <div>더보기</div>
          <BsPlus size={25} />
        </PlusWrapper>
      </TitleWrapper>
      {votes &&
        votes
          .filter(({ endDate }) => getDday(moment(endDate).format('YYYY/MM/DD h:mm a')) > 0)
          .slice(0, 4)
          .map(({ _id, organizer, title, startDate, endDate }) => (
            <VoteList
              key={_id}
              _id={_id}
              title={title}
              organizer={organizer}
              startDate={startDate}
              endDate={endDate}
              closed={false}
            />
          ))}
    </Container>
  );
}

const Container = styled.div`
  margin: 20px auto;
  height: 100%;
  width: 80%;
  display: flex;
  flex-direction: column;
  font-family: 'Nanum Gothic', monospace;
  font-size: 1rem;
`;
const TitleWrapper = styled.div`
  display: flex;
  margin: 4vh 0;
  font-family: 'Nanum Gothic Coding', monospace;
  justify-content: space-between;
`;
const Title = styled.div`
  font-size: 1.3rem;
`;
const PlusWrapper = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Nanum Gothic', monospace;
  cursor: pointer;
`;

export default Home;
