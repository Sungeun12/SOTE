import axios from 'axios';

export function setGroupImg(formData) {
  return axios
    .post('http://localhost:5000/group/upload', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    })
    .then(response => response)
    .catch(error => error);
}
