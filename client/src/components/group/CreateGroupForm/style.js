import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import media from '../../../util/style/media';
import color from '../../../util/style/color';

export const Form = styled.form`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
export const InputContainer = styled.div`
  display: flex;
  margin: 3vh 0;
  align-items: center;
  width: 100%;
  @media (max-width: ${media.tablet}px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
export const Label = styled.label`
  font-family: 'Nanum Gothic Coding', monospace;
  font-size: 1.2rem;
  width: 20%;
  @media (max-width: ${media.tablet}px) {
    margin-bottom: 3.5vh;
  }
`;
export const Input = styled.input`
  width: 80%;
  height: 45px;
  :: placeholder {
    color: '#838383';
    font-size: 0.8rem;
    padding-left: 7px;
    font-family: 'sans-serif';
  }
  border-radius: 4px;
  border: 1px solid #c2c2c2;
  @media (max-width: ${media.tablet}px) {
    width: 100%;
  }
`;
export const Selection = styled.section`
  display: flex;
  margin: 3vh 0;
  align-items: center;
  width: 100%;
  @media (max-width: ${media.tablet}px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
export const SelectItem = styled.div`
  width: 40%;
  @media (max-width: ${media.tablet}px) {
    width: 100%;
  }
`;
export const TextAreaContainer = styled.div`
  display: flex;
  margin: 3vh 0;
  width: 100%;
  @media (max-width: ${media.tablet}px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
export const StyledTextArea = styled(TextareaAutosize)`
  resize: none;
  width: 80%;
  :: placeholder {
    color: '#838383';
    font-size: 0.8rem;
    padding-left: 7px;
    font-family: 'sans-serif';
  }
  border-radius: 4px;
  border: 1px solid #c2c2c2;
  @media (max-width: ${media.tablet}px) {
    width: 100%;
  }
`;
export const SubmitButton = styled.input`
  font-family: 'Nanum Gothic Coding', monospace;
  width: 50%;
  height: 50px;
  margin: 5vh auto;
  text-align: center;
  background-color: ${color.navy};
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid;
  border-color: none;
  font-size: 1rem;
  color: white;
  cursor: pointer;
  opacity: 0.9;
  :hover {
    opacity: 1;
  }
  @media (max-width: ${media.tablet}px) {
    width: 100%;
  }
`;
export const ErrorMessage = styled.div`
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 0.8rem;
  color: red;
  margin: 0 0 3vh 0;
`;
