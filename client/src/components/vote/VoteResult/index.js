import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Web3 from 'web3';
import { loadClosedIdVote, unloadVote } from '../../../actions/vote_actions';
import Header from '../VoteDetail/Header';
import ResultGraph from './ResultGraph';
import Comment from './Comment';
import color from '../../../util/style/color';
import Loading from '../../common/Loading';
import Vote from '../../../util/VoteContract/Vote.json';
import Option from '../VoteDetail/Option';

function VoteResult({ id }) {
  const [data, setData] = useState([]);
  const [web3, setWeb3] = useState(new Web3(window.ethereum));
  const [account, setAccount] = useState('');
  const dispatch = useDispatch();
  console.log(account);
  useEffect(() => {
    dispatch(loadClosedIdVote(id));
    return () => {
      dispatch(unloadVote());
    };
  }, [dispatch, id]);

  const comments = useSelector(state => state.vote.comments);
  const currentVote = useSelector(state => state.vote.currentVote);
  const currentOptions = useSelector(state => state.vote.currentOptions);

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

  const getResult = async () => {
    const voteContract = new web3.eth.Contract(Vote.abi, currentVote.contractAddr);
    const result = await voteContract.methods.getResult().call();
    console.log('result', result[0]);
    if (result) {
      const newData = result[0].map((item, index) => ({
        name: `${item}`,
        uv: `${result[1][index]}`,
      }));
      setData(newData);
    }
  };

  useEffect(() => {
    async function fetchWeb3() {
      await initWeb3().then(r => console.log(r));
    }

    fetchWeb3().then(() => {
      if (currentVote?.contractAddr) {
        getResult();
      }
    });
  }, [currentVote]);

  if (!currentVote) {
    return <Loading />;
  }
  return (
    <Container>
      <Header currentVote={currentVote} closed />
      {currentOptions.map(({ image, name, description }, index) => (
        <Option index={index} name={name} image={image} description={description} key={name} />
      ))}
      <ResultGraph data={data} />
      <Line />
      <Comment comments={comments} id={id} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
`;
const Line = styled.div`
  margin: 3vh 0;
  width: 100%;
  border-bottom: 1px solid ${color.gray};
  opacity: 0.3;
`;
export default VoteResult;
