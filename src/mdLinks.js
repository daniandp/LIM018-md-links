const {
  routeExists, routeAbsolute, mdFileExtension, isADirectory, /* readFile, */ getLinks, validateUrlStatus, findFilesInDir,
} = require('./main');

const mdLinks = (path, options) => new Promise((resolve, reject) => {
  const arrayAllFiles = [];
  const arrayAllPromises = [];
  // comprueba si la ruta existe, si existe, comprueba si es absoluta o relativa(la convierte a absoluta)
  if (routeExists(path)) {
    const pathAbsolute = routeAbsolute(path);
    // SI LA RUTA ES DIRECTORIO
    if (isADirectory(pathAbsolute)) { //  se hace la función recursiva para encontrar archivos dentro del directorio
      const arrayFilesInDir = findFilesInDir(pathAbsolute); // función recursiva, retorna un array de rutas encontradas dentro del directorio
      arrayFilesInDir.forEach((pathFile) => {
        if (mdFileExtension(pathFile) === '.md') {
          arrayAllFiles.push(pathFile);
        } /* else {
          console.log('No hay archivos markdown en el directorio');
        } */
      });
      // console.log('ARRAY ALL FILES', arrayAllFiles);
      arrayAllFiles.forEach((pathFile) => {
        // const fileCont = readFile(pathFile);
        const arrayLinks = getLinks(pathFile);
        // console.log('ARRAY LINKS', arrayLinks);
        // arrayAllLinks.push(arrayLinks);
        // console.log('ARRAY ALL LINKS ---', arrayAllLinks.flat());
        if (arrayLinks !== []) {
          if (options.validate) {
            // console.log('ARRAY LINKS', arrayLinks);
            const allPromises = validateUrlStatus(arrayLinks)
              .then((res) => res.flat())
              // console.log('ARRAY ALL LINKS ------', arrayAllLinks.flat());
              /*  arrayAllPromises.push(res.flat());
               console.log('RESPUESTA', res.flat()); */
              .catch((error) => {
                console.log(error);
              });
            arrayAllPromises.push(allPromises);
            // resolve(arrayAllPromises);
            // console.log(' VALIDATE URL ', validateUrlStatus(arrayLinks));
            // resolve(arrayAllLinks);
          }
        } /* else {
          console.log('No se encontraron links dentro de la ruta ingresada');
        } */
      });
      // console.log('ARRAY DE PROMESAS', arrayAllPromises);
      // resolve(arrayAllPromises);
      Promise.all(arrayAllPromises)
        .then((res) => {
          resolve(res.flat());
          // console.log('QUESSSSESTOOOOOOO', res.flat());
        });
    }
  } else {
    reject(new Error('La ruta ingresada no exise, por favor ingrese una ruta válida'));
  }
});

mdLinks('Directory', { validate: true })
  .then((response) => {
    console.log('resolve de la promesa de mdlinks =>----', response);
  })
  .catch((error) => {
    console.log('este es el error de la promesa mdlinks =>----', error);
  });

module.exports = {
  mdLinks,
};
