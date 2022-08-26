const axios = jest.fn(() => Promise.resolve({
  status: 200,
  statusText: 'OK',
}));

axios.get = jest.fn(() => Promise.resolve({
  status: 200,
  statusText: 'OK',
}));

axios.get = jest.fn(() => Promise.resolve({
  status: 404,
  statusText: 'fail',
}));

module.exports = axios;
