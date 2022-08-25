const axios = jest.fn(() => Promise.resolve({
  status: 200,
  message: 'Ok',
}));

module.exports = {
  axios,
};
