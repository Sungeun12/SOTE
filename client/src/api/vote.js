import axios from 'axios';
import { history } from '../util/history';

export function createVote(body) {
  return axios.post('http://localhost:5000/vote', body).then(response => {
    if (response.data.success) {
      alert('투표 만들기에 성공했습니다.');
      history.push('/');
    } else {
      alert('투표 만들기에 실패 했습니다.');
    }
  });
}

export function loadVote(category, closed) {
  return axios
    .get(`http://localhost:5000/vote?type=${category}&closed=${closed}`)
    .then(response => response)
    .catch(error => error);
}

export function loadIdVote(id) {
  return axios
    .get(`http://localhost:5000/vote/${id}`)
    .then(response => response)
    .catch(error => error);
}

export function patchVote(id) {
  return axios
    .patch(`http://localhost:5000/vote/${id}`)
    .then(response => response)
    .catch(error => error);
}

export function uploadComment(id, body) {
  return axios
    .post(`http://localhost:5000/vote/${id}/comment`, body)
    .then(response => response)
    .catch(error => error);
}
