import axios from 'axios';
import storage from '../util/storage';

export function signIn(email, password) {
  return axios
    .post(
      '/api/user/signin',
      { email, password },
      {
        withCredentials: true,
      },
    )
    .then(response => {
      console.log(response);
      if (response.data.userId) {
        storage.set('user', response.data.userId);
      }
      return response;
    })
    .catch(error => error);
}

export function getUserProfile() {
  return axios({
    method: 'get',
    url: '/api/user/auth',
    config: {
      withCredentials: true,
    },
  })
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
    url: '/api/user/signout',
    config: {
      withCredentials: true,
    },
  })
    .then(response => {
      storage.remove('user');
      storage.remove('name');
      storage.remove('userPic');
      return response;
    })
    .catch(error => error);
}
