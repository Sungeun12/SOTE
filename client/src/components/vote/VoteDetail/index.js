import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Web3 from 'web3';
import * as api from '../../../api/vote';
import { loadIdVote, unloadVote } from '../../../actions/vote_actions';
import Header from './Header';
import Option from './Option';
import media from '../../../util/style/media';
import SelectOption from './SelectOption';
import color from '../../../util/style/color';
import Vote from '../../../util/VoteContract/Vote.json';
import Loading from '../../common/Loading';
import storage from '../../../util/storage';

function VoteDetail({ id }) {
  const [organizer, setOrganizer] = useState('');
  const history = useHistory();
  const userId = storage.get('user');
  const [web3, setWeb3] = useState(new Web3(window.ethereum));
  const [account, setAccount] = useState('');

  const currentVote = useSelector(state => state.vote.currentVote);
  const currentOptions = useSelector(state => state.vote.currentOptions);
  const [singleType, setSingleType] = useState(true);
  const [result, setResult] = useState([]);
  const [singleResult, setSingleResult] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadIdVote(id));
    return () => {
      dispatch(unloadVote());
    };
  }, [dispatch, id]);

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    if (currentVote?.organizer?._id && currentVote.organizer._id === userId) {
      setOrganizer(true);
    }
    if (currentVote && currentVote.selectionType === 'single') {
      setSingleType(true);
    } else {
      setSingleType(false);
    }
  }, [currentVote]);

  const addResult = _id => {
    if (result.includes(_id)) return;
    if (singleType) {
      setSingleResult(_id);
    }

    const newArray = result.concat(_id);
    setResult(newArray);
  };
  const deleteResult = _id => {
    if (!result.includes(_id)) return;

    const newArray = result.filter(item => item !== _id);
    setResult(newArray);
  };

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

  const makeVote = async () => {
    if (singleType) {
      // eslint-disable-next-line no-restricted-globals
      const conResult = confirm(`${singleResult + 1}번을 투표하시겠습니까?`);
      if (!conResult) {
        return;
      }
      const voteContract = new web3.eth.Contract(Vote.abi, currentVote.contractAddr);

      voteContract.methods
        .castVoteForSingleOption(singleResult)
        .send({
          from: account,
        })
        .on('transactionHash', hash => {
          console.log(hash);
        })
        .then(() => {
          const body = {
            userId,
          };
          api.vote(id, body);
          alert('투표가 완료되었습니다.');
          history.push(`/vote/${currentVote.voteType}`);
        });
    }
    if (!singleType) {
      const index = result.map(item => item + 1);
      // eslint-disable-next-line no-restricted-globals
      const conResult = confirm(`${index}번을 투표하시겠습니까?`);
      if (!conResult) {
        return;
      }
      const voteContract = new web3.eth.Contract(Vote.abi, currentVote.contractAddr);
      voteContract.methods
        .castVoteForMultiOptions(result)
        .send({
          from: account,
        })
        .on('transactionHash', hash => {
          console.log(hash);
        })
        .then(() => {
          const body = {
            userId,
          };
          api.vote(id, body);
          alert('투표가 완료되었습니다.');
          history.push(`/vote/${currentVote.voteType}`);
        });
    }
  };
  if (!currentVote) {
    return <Loading />;
  }
  return (
    <Container>
      <Header currentVote={currentVote} />
      {currentOptions &&
        currentOptions.map(({ image, name, description }, index) => (
          <Option index={index} name={name} image={image} description={description} key={name} />
        ))}
      {organizer ? (
        ''
      ) : (
        <ToVoteWrapper>
          <ToVote>투표하기</ToVote>
          <OptionsWrapper>
            {currentOptions.map(({ name, _id }, index) => (
              <SelectOption
                index={index}
                name={name}
                key={_id}
                currentVote={currentVote}
                singleType={singleType}
                _id={_id}
                addResult={addResult}
                deleteResult={deleteResult}
              />
            ))}
          </OptionsWrapper>
          <VoteButton type="button" value="투표하기" onClick={makeVote} />
        </ToVoteWrapper>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 0 auto;
  @media (max-width: ${media.tablet}px) {
    width: 95%;
  }
`;
const OptionsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin: 0vh auto 8vh auto;
  row-gap: 8vh;
`;
const ToVoteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
`;
const ToVote = styled.div`
  font-family: 'Nanum Gothic Coding', monospace;
  width: 100px;
  font-size: 1rem;
  border: 2px solid ${color.navy};
  border-radius: 5px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin: 0 2vw 6vh 0;
`;
const VoteButton = styled.input`
  margin: 0 auto;
  font-family: 'Nanum Gothic Coding', monospace;
  width: 70%;
  height: 60px;
  text-align: center;
  background-color: ${color.navy};
  padding: 8px 10px;
  border-radius: 30px;
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
    width: 90%;
  }
`;

export default VoteDetail;
