const {
    routeExists, routeAbsolute, mdFileExtension, readFile, getLinks, validateUrlStatus
} = require('./main');

const mdLinks = (path /* , options */) => new Promise((resolve/* , reject */) => {
  if (routeExists(path)) {
    routeAbsolute(path);
  }
  if (mdFileExtension(path) === '.md') {
    readFile(path);
  }
});

mdLinks('prueba.md')
  .then((res) => {
    console.log(res);
  });
