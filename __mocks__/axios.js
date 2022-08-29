const axios = jest.fn(() => Promise.resolve({
  status: 200,
  statusText: 'OK',
}));

axios.get = jest.fn(() => Promise.resolve({
  status: 200,
  statusText: 'OK',
}));

/* axios.get = jest.fn(() => Promise.reject(new Error(
  {
    status: 400,
    statusText: 'FAIL',
  },
))); */

module.exports = axios;
