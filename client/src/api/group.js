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

export function loadUserGroup(userId) {
  return axios
    .get(`http://localhost:5000/user/${userId}/group`)
    .then(response => response.data.data)
    .catch(error => error);
}

export function uploadFile(formData) {
  return axios
    .post('http://localhost:5000/group/upload', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    })
    .then(response => response)
    .catch(error => error);
}

export function createNotice(body, groupId) {
  // eslint-disable-next-line consistent-return
  return axios.post(`http://localhost:5000/group/${groupId}/notice`, body).then(response => {
    if (response.data.success) {
      alert('공지사항 작성이 완료되었습니다.');
      history.push(`/group/${groupId}/notice/${response.data.data}`);
    } else {
      alert('공지사항 작성에 실패 했습니다.');
    }
  });
}

export function loadIdNotice(id) {
  return axios
    .get(`http://localhost:5000/notice/${id}`)
    .then(response => response)
    .catch(error => error);
}

export function leaveGroup(id, userId) {
  return axios
    .post(`http://localhost:5000/group/${id}/leave`, { userId }, { withCredentials: true })
    .then(response => response)
    .catch(error => error);
}
