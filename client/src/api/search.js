import axios from 'axios';

export function searchAll(word) {
  return axios
    .get(`http://localhost:5000/search?query=${word}`)
    .then(response => response)
    .catch(error => error);
}

export function searchSection(word, section) {
  return axios
    .get(`http://localhost:5000/search?query=${encodeURIComponent(word)}&section=${section}`)
    .then(response => response)
    .catch(error => error);
}
