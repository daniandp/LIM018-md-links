const axios = jest.fn(() => Promise.resolve({
  status: 200,
  statusText: 'OK',
}));

axios.get = jest.fn(() => Promise.resolve({
  status: 200,
  statusText: 'OK',
}));

axios.get = jest.fn(() => Promise.resolve({
  status: 'Error',
  statusText: 'FAIL',
}));

module.exports = axios;
