const {
  routeExists, routeAbsolute, mdFileExtension, isADirectory, /* readFile, */ getLinks, validateUrlStatus, findFilesInDir,
} = require('./main');

const mdLinks = (path, options) => {
  
  
  return new Promise((resolve, reject) => {
    const arrayAllFiles = [];
    // comprueba si la ruta existe, si existe, comprueba si es absoluta o relativa(la convierte a absoluta)
    if (routeExists(path)) {
      const pathAbsolute = routeAbsolute(path);
      if (isADirectory(pathAbsolute)) { // si es un directorio se hace la función recursiva para encontrar archivos dentro
        const arrayFilesInDir = findFilesInDir(pathAbsolute); // función recursiva, retorna un array de rutas encontradas dentro del directorio
        arrayFilesInDir.forEach((pathFile) => {
          if (mdFileExtension(pathFile) === '.md') {
            arrayAllFiles.push(pathFile);
          }
        });
        console.log('otro console', arrayAllFiles);
        arrayAllFiles.forEach((pathFile) => {
          // const fileCont = readFile(pathFile);
          // console.log('contenido del archivo =>>', fileCont);
          const arrayLinks = getLinks(pathFile);
          console.log('??????????? =>', arrayLinks);
          arrayAllFiles.push(arrayLinks);
          
          /*  if (options.validate) {
            validateUrlStatus(arrayLinks)
              .then((res) => {
                resolve(res);
              })
              .catch((error) => {
                console.log(error);
              });
          } */
        });

        resolve(arrayAllFiles.flat());
        /* Promise.all(arrayAllFiles)
          .then((res) => {
            resolve(res);
          }); */
      }
    }
  });




}

mdLinks('Directory', { validate: true })
  .then((response) => {
    console.log('estoy acaa', response);
  })
  .catch((error) => {
    console.log('este es el erroooooor =>', error);
  });

/* validateUrlStatus('Directory/DirPrueba/prueba.md').then((result) => {
  console.log(result);
}); */

module.exports = {
  mdLinks,
};
