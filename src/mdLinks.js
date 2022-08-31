const {
  routeExists, routeAbsolute, mdFileExtension, isADirectory, /* readFile, */ getLinks, validateUrlStatus, findFilesInDir,
} = require('./main');

const mdLinks = (path, options) => new Promise((resolve, reject) => {
  const arrayAllFiles = [];
  const arrayAllLinks = [];
  // comprueba si la ruta existe, si existe, comprueba si es absoluta o relativa(la convierte a absoluta)
  if (routeExists(path)) {
    const pathAbsolute = routeAbsolute(path);
    // SI LA RUTA ES DIRECTORIO
    if (isADirectory(pathAbsolute)) { //  se hace la función recursiva para encontrar archivos dentro del directorio
      const arrayFilesInDir = findFilesInDir(pathAbsolute); // función recursiva, retorna un array de rutas encontradas dentro del directorio
      arrayFilesInDir.forEach((pathFile) => {
        if (mdFileExtension(pathFile) === '.md') {
          arrayAllFiles.push(pathFile);
        } else {
          console.log('No hay archivos markdown en el directorio');
        }
      });

      arrayAllFiles.forEach((pathFile) => {
        // const fileCont = readFile(pathFile);
        // console.log('contenido del archivo =>>', fileCont);
        const arrayLinks = getLinks(pathFile);
        arrayAllLinks.push(arrayLinks);
        // console.log('ARRAY ALL LINKS ---', arrayAllLinks.flat());
        if (arrayAllLinks !== []) {
          if (options.validate) {
            validateUrlStatus(arrayAllLinks.flat())
              .then((res) => {
                // console.log('ARRAY ALL LINKS ------', arrayAllLinks.flat());
                resolve(res);
                console.log('RESPUESTA', res.flat());
              })
              .catch((error) => {
                console.log(error);
              });
          }
        } else {
          console.log('No se encontraron links dentro de la ruta ingresada');
        }
      });
      // resolve(arrayAllLinks.flat());
      /* Promise.allSettled(arrayAllLinks.flat())
        .then((res) => {
          resolve(res);
          console.log('QUESSSSESTOOOOOOO', res);
        }); */
    }
  } else {
    console.log('La ruta ingresada no exise, por favor ingrese una ruta válida');
  }
});

/* mdLinks('Directory', { validate: true })
  .then((response) => {
    console.log('resolve de la promesa de mdlinks =>----', response);
  })
  .catch((error) => {
    console.log('este es el error de la promesa mdlinks =>----', error);
  }); */

module.exports = {
  mdLinks,
};
