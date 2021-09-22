import React, { useState } from 'react';
import styled from 'styled-components';
import media from '../../util/style/media';
import color from '../../util/style/color';
import SearchBar from '../../components/search/SearchBar';
import { categoryData } from '../../components/search/CategoryBtn/categoryData';
import CategoryBtn from '../../components/search/CategoryBtn';
import useInput from '../../hooks/useInput';
import * as api from '../../api/search';

function Search() {
  const [word, onChangeWord] = useInput('');
  const [category, setCategory] = useState(categoryData[0].value);
  const [searchWord, setSearchWord] = useState('');
  const handleSearch = () => {
    setSearchWord(word);
    if (category === 'all') {
      api.searchAll(word).then(r => console.log(r));
    } else {
      api.searchSection(word, category).then(r => console.log(r));
    }
  };
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
      {searchWord && <div>{searchWord}에 대한 검색 결과</div>}
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
const Line = styled.div`
  border-bottom: 1px solid ${color.lightGray};
  margin: 4vh 0;
`;
const CategoryWrapper = styled.div`
  display: flex;
  margin-top: 2vh;
`;
export default Search;
