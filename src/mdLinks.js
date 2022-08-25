const {
  routeExists, routeAbsolute, mdFileExtension, readFile, getLinks, validateUrlStatus,
} = require('./main');

const mdLinks = (path, options) => new Promise((resolve/* , reject */) => {
  if (routeExists(path)) {
    routeAbsolute(path);
  }
  if (mdFileExtension(path) === '.md') {
    (readFile(path));
  }

  if (options.validate) {
    getLinks(path);
    validateUrlStatus(path)
      .then((response) => {
        resolve(response)
      })

  }

  /* if (options.validate) {
    const linksSaved = getLinks(path);
    const arrayPromises = [];
    for (let i = 0; i < linksSaved.length; i += 1) {
      const validateLinks = validateUrlStatus(linksSaved[i].href)
        .then((response) => {
          linksSaved[i].status = response.status;
          linksSaved[i].message = response.statusText;
          // console.log('dos', linksSaved[i]);
          return linksSaved[i];
        })
        .catch(() => {
          linksSaved[i].status = 'ERROR';
          linksSaved[i].message = 'FAIL';
          return linksSaved[i];
        });
      arrayPromises.push(validateLinks);
      // console.log(validateUrlStatus(prueba[i]));
    }
    resolve(arrayPromises);
  } */
});
validateUrlStatus('Directory/DirPrueba/prueba.md').then((result) => {
  console.log(result);
})
/* mdLinks('Directory/DirPrueba/prueba.md', { validate: true })
  .then((res) => {
    console.log('res', res);
    /* Promise.all(res).then((response) => {
      console.log('aquiiiiiii', response.flat());
    }); */
  // });
