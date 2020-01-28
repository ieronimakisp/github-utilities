const axios = require('axios');

async function get(...params) {
  return axios.get(...params);
}

module.exports = {
  httpClient: axios,
  get,
};
