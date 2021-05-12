import { Link } from 'react-router-dom';
import styled from 'styled-components';
import color from '../../util/style/color';
import media from '../../util/style/media';

export const Form = styled.form`
  width: 500px;
  @media (max-width: ${media.tablet}px) {
    width: 90vw;
  }
  margin: 4vh auto;
  font-family: 'Nanum Gothic Coding', monospace;
  display: flex;
  flex-direction: column;
`;
export const Label = styled.label`
  font-size: 1.2rem;
  width: 130px;
  margin: 1vh 0;
`;

export const Input = styled.input`
  margin: 2vh 0 3vh 0;
  padding: 0;
  width: 100%;
  height: 45px;
  line-height: 36px;
  :: placeholder {
    color: '#838383';
    font-size: 0.8rem;
    padding-left: 7px;
    font-family: 'Nanum Gothic', sans-serif;
  }
  border-radius: 4px;
  border: 1px solid #c2c2c2;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
export const EmailWrapper = styled.div`
  margin: 2vh 0 3vh 0;
  display: flex;
  border-radius: 4px;
  border: 1px solid #c2c2c2;
  width: 100%;
  height: 45px;
  align-items: center;
`;

export const EmailInput = styled.input`
  border: none;
  border-radius: 4px;
  height: 40px;
  line-height: 40px;
  width: 50%;
  :: placeholder {
    color: '#838383';
    font-size: 0.8rem;
    padding-left: 7px;
    font-family: 'Nanum Gothic', sans-serif;
  }
`;
export const Email = styled.div`
  text-align: center;
  font-size: 0.8rem;
  height: 40px;
  line-height: 40px;
  width: 50%;
  font-family: 'Nanum Gothic', sans-serif;
  border-left: 1px solid #c2c2c2;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 40px;
`;
export const AuthButton = styled.button`
  font-family: 'Nanum Gothic Coding', sans-serif;
  width: 40%;
  height: 40px;
  text-align: center;
  background-color: white;
  padding: 8px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  border: 1px solid ${color.darkGray};
  color: ${color.darkGray};
  cursor: pointer;
  opacity: 0.95;
  :hover {
    opacity: 1;
  }
  margin-left: 10px;
  align-self: flex-end;
  margin-top: 2vh;
  :focus {
    outline: none;
  }
`;
export const AgainRequestButton = styled.button`
  font-family: 'Nanum Gothic Coding', sans-serif;
  width: 40%;
  height: 40px;
  text-align: center;
  background-color: ${color.gray};
  padding: 8px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  border: none;
  color: white;
  cursor: pointer;
  opacity: 0.95;
  :hover {
    opacity: 1;
  }
  margin-left: 10px;
  align-self: flex-end;
  margin-top: 2vh;
  :focus {
    outline: none;
  }
`;
export const Confirm = styled.button`
  font-family: 'Nanum Gothic Coding', sans-serif;
  width: 40%;
  height: 40px;
  text-align: center;
  background-color: ${color.gray};
  padding: 8px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  border: none;
  color: white;
  opacity: 0.95;
  margin-left: 10px;
  align-self: flex-end;
  margin-top: 2vh;
  :focus {
    outline: none;
  }
`;
export const ErrorMessage = styled.div`
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 0.8rem;
  color: red;
  margin: 0 0 3vh 0;
`;
export const CheckBoxWrapper = styled.div`
  border: 1px solid ${color.gray};
  padding: 2vh 2vw;
  margin: 1vh 0;
`;
export const CheckBoxItem = styled.div`
  display: flex;
  font-size: 1rem;
  color: ${color.darkGray};
  margin: 3vh 0 3vh 0;
  align-items: center;
`;
export const Line = styled.div`
  width: 100%;
  border-bottom: 1px solid ${color.gray};
`;

export const SubmitButton = styled.button`
  margin-top: 5vh;
  width: 100%;
  height: 10vh;
  font-size: 1.2rem;
  font-family: 'Nanum Gothic Coding', sans-serif;
  border-radius: 50px;
  background-color: ${color.navy};
  color: white;
  cursor: pointer;
  border: none;
  opacity: 0.9;
  :hover {
    opacity: 1;
  }
  :focus {
    outline: none;
  }
`;
export const BottomText = styled.div`
  color: ${color.darkGray};
  margin: 3vh auto;
  font-size: 1rem;
`;
export const ToLogin = styled(Link)`
  color: black;
  text-decoration: none;
  margin-left: 0.8vw;
`;
export const customStyles = {
  option: (provided, state) => ({
    ...provided,
    height: '40px',
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
    color: '#838383',
  }),
  control: base => ({
    ...base,
    height: '50px',
    boxShadow: 'none',
    margin: '1vh 0 2vh 0',
  }),
  singleValue: styles => ({
    ...styles,
    color: '#313131',
  }),
};
