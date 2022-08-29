const {
  routeExists, routeAbsolute, mdFileExtension, isADirectory, readFile, getLinks, validateUrlStatus, findFilesInDir,
} = require('./main');

const mdLinks = (path, options) => new Promise((resolve/* , reject */) => {
  const arrayAllFiles = [];
  // comprueba si la ruta existe, si existe, comprueba si es absoluta o relativa(la convierte a absoluta)
  if (routeExists(path)) {
    const pathAbsolute = routeAbsolute(path);
    if (isADirectory(pathAbsolute)) { // si es un directorio se hace la función recursiva para encontrar archivos dentro
      const arrayFilesInDir = findFilesInDir(pathAbsolute); // función recursiva, array de rutas encontradas dentro del directorio
      arrayFilesInDir.forEach((pathFile) => {
        if (mdFileExtension(pathFile === '.md')) {
          arrayAllFiles.push(pathFile);
        }
        return arrayAllFiles;
      });
      const arrayAllLinks = [];
      arrayAllFiles.forEach((pathFile) => {
        const fileCont = readFile(pathFile);
        const arrayLinks = getLinks(fileCont);
        if (options.validate) {
          arrayAllLinks.push(validateUrlStatus(arrayLinks));
        }
        return arrayAllLinks;
      });
    }
  }
});
/*
    if (mdFileExtension(path) === '.md') {
      (readFile(path));
    }

    if (options.validate) {
      getLinks(path);
      resolve(validateUrlStatus(path));
    } */

mdLinks('Directory', { validate: true })
  .then((res) => {
    Promise.all(res).then((response) => {
      console.log('aquiiiiiii', response.flat());
    });
  })
  .catch((error) => {
    console.log('este es el erroooooor =>', error);
  });
/* validateUrlStatus('Directory/DirPrueba/prueba.md').then((result) => {
  console.log(result);
}); */
