import axios from 'axios';

export function loadParticipatedVote(id) {
  return axios
    .get(`http://localhost:5000/user/${id}/vote`)
    .then(response => response)
    .catch(error => error);
}

export function loadUserGroup(id) {
  return axios
    .get(`http://localhost:5000/user/${id}/group`)
    .then(response => response)
    .catch(error => error);
}

export function changeProfile(body) {
  return axios
    .put(`http://localhost:5000/user/changeprofile`, body, {
      headers: { 'content-type': 'multipart/form-data' },
    })
    .then(response => response)
    .catch(error => error);
}
