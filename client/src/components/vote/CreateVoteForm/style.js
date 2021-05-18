import styled from 'styled-components';
import media from '../../../util/style/media';

export const Label = styled.label`
  font-family: 'Nanum Gothic Coding', monospace;
  font-size: 1.2rem;
  width: 30%;
  @media (max-width: ${media.tablet}px) {
    margin-bottom: 3.5vh;
  }
`;

export const LabelColumn = styled.label`
  margin-bottom: 3.5vh;
  font-family: 'Nanum Gothic Coding', monospace;
  font-size: 1.2rem;
  width: 80%;
`;

export const customStyles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: '0.8rem',
    background: 'white',
    color: state.isSelected ? 'black' : 'gray',
  }),
  placeholder: provided => ({
    ...provided,
    fontSize: '0.8rem',
    fontFamily: ['sans-serif'],
  }),
  menu: provided => ({
    ...provided,
    fontSize: '0.8rem',
    color: '#838383',
  }),
  control: base => ({
    ...base,
    fontSize: '0.8rem',
    boxShadow: 'none',
    height: '45px',
  }),
  singleValue: styles => ({
    ...styles,
    color: '#313131',
  }),
};

export const ErrorMessage = styled.div`
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 1rem;
  color: red;
  margin: 2vh 0;
  text-align: center;
`;
