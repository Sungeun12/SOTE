import React from 'react';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';
import color from '../../../util/style/color';

function SearchBar({ onChangeWord, handleSearch }) {
  return (
    <Container>
      <FiSearch size="25" />
      <Input type="text" onChange={onChangeWord} />
      <Button type="button" onClick={handleSearch}>
        검색
      </Button>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: ${color.lightGray};
  padding: 2vh 3vw;
  border-radius: 30px;
  justify-content: space-between;
`;
const Input = styled.input`
  margin-left: 1vw;
  font-size: 1rem;
  outline: none;
  border: none;
  background-color: ${color.lightGray};
  width: 85%;
`;
const Button = styled.button`
  font-size: 1rem;
  background-color: none;
  outline: none;
  border: 1px solid black;
  cursor: pointer;
  font-weight: bold;
`;
export default SearchBar;
