import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { useForm, FormProvider } from 'react-hook-form';
import styled from 'styled-components';
import Vote from '../../util/VoteContract/Vote.json';
import ConnectForm from './ConnectForm';
import media from '../../util/style/media';
import color from '../../util/style/color';

function CreateVote() {
  const [web3, setWeb3] = useState(new Web3(window.ethereum));
  const [account, setAccount] = useState('');

  const initWeb3 = async () => {
    if (window.ethereum) {
      console.log('recent mode');
      setWeb3(new Web3(window.ethereum));
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.log('user denied account access...');
      }
    } else if (window.web3) {
      console.log('legacy mode');
      setWeb3(new Web3(Web3.currentProvider));
    } else {
      console.log('none-ethereum browser detected ');
    }
  };

  useEffect(() => {
    async function fetchWeb3() {
      await initWeb3().then(r => console.log(r));
    }

    fetchWeb3();
  }, []);

  const methods = useForm({
    defaultValues: {
      options: [{ name: '' }, { name: '' }],
    },
  });

  const onSubmit = async data => {
    const optionNames = data.options.map(option => option.name);
    const selectionType = parseInt(data.selectionType, 2);
    const openingTime = Math.floor(data.startDate.getTime() / 1000.0);
    const closingTime = Math.floor(data.endDate.getTime() / 1000.0);

    console.log(account);
    console.log(typeof startDate);
    const voteContract = new web3.eth.Contract(Vote.abi);

    voteContract
      .deploy({
        data: Vote.bytecode,
        arguments: [optionNames, selectionType, openingTime, closingTime],
      })
      .send({
        from: account,
      })
      .on('transactionHash', hash => {
        console.log(hash);
      })
      .then(newContractInstance => {
        console.log(newContractInstance.options.address);
        // contractAddr 변수에 담아 서버에 넘긴다
      });

    alert('투표가 만들어졌습니다.');
  };
  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <ConnectForm />
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
  margin-right: 2vw;
  @media (max-width: ${media.tablet}px) {
    width: 50%;
  }
`;

export default CreateVote;
