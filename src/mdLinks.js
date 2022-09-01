const {
  routeExists,
  routeAbsolute,
  mdFileExtension,
  isADirectory,
  /* readFile, */
  getLinks,
  validateUrlStatus,
  findFilesInDir,
  stats,
} = require('./main');

const mdLinks = (path, options) => new Promise((resolve, reject) => {
  const arrayAllFiles = [];
  const arrayAllPromises = [];
  const arrayPrueba = [];
  // comprueba si la ruta existe, si existe, comprueba si es absoluta o relativa(la convierte a absoluta)
  if (!routeExists(path)) {
    reject(new Error('La ruta ingresada no existe, por favor ingrese una ruta válida'));
  }
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
    arrayAllFiles.forEach((pathFile) => {
      const arrayLinks = getLinks(pathFile);
      arrayPrueba.push(arrayLinks);
      // console.log('ARRAY LINKS', arrayLinks.concat(arrayLinks));
      /*  if (arrayLinks !== []) { */
      if (options.validate) {
        const allPromises = validateUrlStatus(arrayLinks);
        arrayAllPromises.push(allPromises);
        /*  const allPromises = validateUrlStatus(arrayLinks)
          .then((res) => res.flat())
          .catch((error) => {
            console.log(error);
          });
        arrayAllPromises.push(allPromises); */
      } else {
        resolve(arrayPrueba);
      }
      if (options.stats) {
        const statsOfUrl = stats(arrayLinks);
        arrayAllPromises.push(statsOfUrl);
      }

      /* } */ /* else {
        console.log('No se encontraron links dentro de la ruta ingresada');
      } */
      // return arrayAllPromises;
    });
    Promise.all(arrayAllPromises)
      .then((result) => {
        resolve(result.flat());
      });

    // SI LA RUTA ES UN ARCHIVO
  }
  if (mdFileExtension(pathAbsolute) === '.md') {
    const arrayLinks = getLinks(pathAbsolute);
    if (options.validate && options.stats) {
      console.log('ESTAMOS ACA');
      return;
    }
    if (options.validate) {
      validateUrlStatus(arrayLinks).then((res) => resolve(res));
      return;
    }
    if (options.stats) {
      const statsOfUrl = stats(arrayLinks);
      resolve(statsOfUrl);
      return;
    }
    resolve(arrayLinks);
  }
});

mdLinks('Directory/DirPrueba/prueba.md', { validate: true, stats: true })
  .then((response) => {
    console.log('resolve de la promesa de mdlinks =>----', response);
  })
  .catch((error) => {
    console.log('este es el error de la promesa mdlinks =>----', error);
  });

module.exports = {
  mdLinks,
};
