import React, { useState } from 'react';
import styled from 'styled-components';
import media from '../../util/style/media';
import color from '../../util/style/color';
import SearchBar from '../../components/search/SearchBar';
import { categoryData } from '../../components/search/CategoryBtn/categoryData';
import CategoryBtn from '../../components/search/CategoryBtn';
import useInput from '../../hooks/useInput';
import * as api from '../../api/search';
import VoteItem from '../../components/common/VoteItem';
import GroupItem from '../../components/group/GroupList/GroupItem';

function Search() {
  const [word, onChangeWord] = useInput('');
  const [category, setCategory] = useState(categoryData[0].value);
  const [searchWord, setSearchWord] = useState('');
  const [vote, setVote] = useState([]);
  const [group, setGroup] = useState([]);
  const handleSearch = () => {
    setSearchWord(word);
    if (category === 'all') {
      api.searchAll(word).then(r => {
        console.log(r.data);
        if (r.data.success) {
          setVote(r.data.data.votes);
          setGroup(r.data.data.groups);
        }
      });
    }
    if (category === 'vote') {
      api.searchSection(word, category).then(r => {
        if (r.data.success) {
          setVote(r.data.data);
          setGroup([]);
        }
      });
    }
    if (category === 'group') {
      api.searchSection(word, category).then(r => {
        if (r.data.success) {
          setGroup(r.data.data);
          setVote([]);
        }
      });
    }
  };
  console.log(vote, group);
  return (
    <Container>
      <Header>
        <h1>통합 검색</h1>
        <Text>찾고자하는 검색어를 입력하세요.</Text>
      </Header>
      <SearchBar onChangeWord={onChangeWord} handleSearch={handleSearch} />
      <Line />
      <div>카테고리</div>
      <CategoryWrapper>
        {categoryData.map(({ id, text, value }) => (
          <CategoryBtn
            key={id}
            text={text}
            value={value}
            currentCategory={category === value}
            setCategory={setCategory}
          />
        ))}
      </CategoryWrapper>
      <Line />
      {searchWord && (
        <div>
          {searchWord}에 대한 검색 결과: {vote.length + group.length}개
        </div>
      )}

      <ResultWrapper>
        {vote &&
          vote.map(({ _id, organizer, title, startDate, endDate, voteType }) => (
            <VoteItem
              key={_id}
              _id={_id}
              title={title}
              organizer={organizer}
              startDate={startDate}
              endDate={endDate}
              voteType={voteType}
            />
          ))}
        <Line />
        {group &&
          group.map(({ description, members, name, image, _id, managers }) => (
            <GroupItem
              key={name}
              description={description}
              members={members}
              name={name}
              image={image}
              id={_id}
              managers={managers}
            />
          ))}
      </ResultWrapper>
    </Container>
  );
}
const Container = styled.div`
  width: 60%;
  @media (max-width: ${media.tablet}px) {
    width: 90%;
  }
  margin: 13vh auto;
  font-family: 'Nanum Gothic Coding', sans-serif;
`;
const Header = styled.div`
  line-height: 1.7;
  margin-bottom: 2vh;
  font-size: 1.6rem;
  width: 100%;
`;

const Text = styled.div`
  font-size: 1rem;
  color: ${color.darkGray};
`;
const ResultWrapper = styled.div`
  margin: 2vh 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Line = styled.div`
  border-bottom: 1px solid ${color.lightGray};
  margin: 4vh 0;
`;
const CategoryWrapper = styled.div`
  display: flex;
  margin-top: 2vh;
`;

export default Search;
