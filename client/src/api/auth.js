import axios from 'axios';
import storage from '../util/storage';

export function signUp(data) {
  return axios
    .post('http://localhost:5000/user/signup', data)
    .then(response => response)
    .catch(error => error);
}

export function sendMail(email) {
  return axios
    .post('http://localhost:5000/user/sendmail', { email })
    .then(response => response)
    .catch(error => error);
}
export function authConfirm(email, cauthNumber) {
  return axios
    .post('http://localhost:5000/user/authConfirm', { email, cauthNumber })
    .then(response => response)
    .catch(error => error);
}
export function signIn(email, password) {
  return axios
    .post('http://localhost:5000/user/signin', { email, password })
    .then(response => {
      if (response.data.userId) {
        storage.set('user', response.data.userId);
      }
      return response;
    })
    .catch(error => error);
}

export function getUserProfile() {
  return axios
    .get('http://localhost:5000/user/auth')
    .then(response => {
      if (response.data) {
        storage.set('name', response.data.name);
        storage.set('userPic', '');
      }
      return response;
    })
    .catch(error => error);
}

export function logout() {
  return axios({
    method: 'get',
    url: 'http://localhost:5000/user/signout',
  })
    .then(response => {
      storage.remove('user');
      storage.remove('name');
      storage.remove('userPic');
      return response;
    })
    .catch(error => error);
}
