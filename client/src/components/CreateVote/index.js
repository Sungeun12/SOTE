import React from 'react';
import {useForm, FormProvider} from "react-hook-form";
import moment from "moment";
import styled from 'styled-components'
import ConnectForm from "./ConnectForm";
import media from "../../util/style/media";
import color from "../../util/style/color";




function CreateVote() {
    const methods = useForm({
        defaultValues: {
            options:[{name:""},{name:""}]
        },
    });
    const onSubmit = data => {
        alert('모든 값을 입력해주세요');
        console.log(data)
        const startDate = moment(data.startDate).format("YYYY/MM/DD HH:MM a").toString();
        const endDate = moment(data.endDate).format("YYYY/MM/DD HH:MM a").toString();
        console.log(startDate)
        console.log(endDate)
    }

    return (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
                <ConnectForm/>
                <ButtonContainer>
                    <PreviewButton type="button" value="미리보기" />
                    <SubmitButton type="submit" value="투표 만들기" />
                </ButtonContainer>
            </Form>
        </FormProvider>

    );
}

const Form = styled.form`
  margin: 7vh auto;
  width: 700px;
    @media (max-width: ${media.tablet}px) {
    width: 80%;
  }
`;
const ButtonContainer = styled.div`
margin: 5vh auto;
width: 100%;
display: flex;
justify-content: center;
`;
const SubmitButton = styled.input`
  font-family: 'Nanum Gothic Coding', monospace;
  width: 30%;
  height: 50px;
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
    width: 50%;
  }
`;

 const PreviewButton = styled.input`
 font-family: 'Nanum Gothic Coding', monospace;
  width: 30%;
  height: 50px;
  text-align: center;
  background-color: white;
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid ${color.navy};
  color: ${color.navy};
  cursor: pointer;
  opacity: 0.9;
  :hover {
    opacity: 1;
  }
  margin-right:2vw;
      @media (max-width: ${media.tablet}px) {
    width: 50%;
  }
`;


export default CreateVote;