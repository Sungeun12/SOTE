import axios from 'axios';
import { history } from '../util/history';

export function createVote(body, category) {
  return axios.post('http://localhost:5000/vote', body).then(response => {
    if (response.data.success) {
      alert('투표 만들기에 성공했습니다.');
      // eslint-disable-next-line no-underscore-dangle
      if (response.data.voteId) {
        // eslint-disable-next-line no-underscore-dangle
        history.push(`/vote/${category}/${response.data.voteId}`);
      }
    } else {
      alert('투표 만들기에 실패 했습니다.');
    }
  });
}

export function loadVote(category, order, closed) {
  return axios
    .get(`http://localhost:5000/vote?type=${category}&order=${order}&closed=${closed}`)
    .then(response => response)
    .catch(error => error);
}

export function loadIdVote(id) {
  return axios
    .get(`http://localhost:5000/vote/${id}`)
    .then(response => response)
    .catch(error => error);
}

export function vote(id, body) {
  return axios
    .post(`http://localhost:5000/vote/${id}`, body)
    .then(response => response)
    .catch(error => error);
}

export function uploadComment(id, body) {
  return axios
    .post(`http://localhost:5000/vote/${id}/comment`, body)
    .then(response => response)
    .catch(error => error);
}

export function deleteComment(id) {
  return axios
    .patch(`http://localhost:5000/comment/${id}`, { id })
    .then(response => response)
    .catch(error => error);
}
