import axios from 'axios';
import { history } from '../util/history';

export function setGroupImg(formData) {
  return axios
    .post('http://localhost:5000/group/upload', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    })
    .then(response => response)
    .catch(error => error);
}

export function createGroup(body) {
  return axios.post('http://localhost:5000/group', body).then(response => {
    if (response.data.success) {
      alert('단체 만들기가 완료되었습니다.');
      history.push('/group');
    } else {
      alert('단체 만들기에 실패 했습니다.');
    }
  });
}

export function loadGroup(category, order) {
  return axios
    .get(`http://localhost:5000/group?category=${category}&order=${order}`)
    .then(response => response)
    .catch(error => error);
}

export function joinGroup(id, userId) {
  return axios
    .post(`http://localhost:5000/group/${id}/joinreq`, { userId }, { withCredentials: true })
    .then(response => response)
    .catch(error => error);
}

export function loadIdGroup(id) {
  return axios
    .get(`http://localhost:5000/group/${id}`)
    .then(response => response)
    .catch(error => error);
}
