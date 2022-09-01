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
  statsBroken,
} = require('./main');

const mdLinks = (path, options) => new Promise((resolve, reject) => {
  const arrayAllFiles = [];
  const arrayAllPromises = [];
  const arrayJustLinks = [];
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
      }
    });

    arrayAllFiles.forEach((pathFile) => {
      const arrayLinks = getLinks(pathFile);
      arrayJustLinks.push(arrayLinks);
      const allPromises = validateUrlStatus(arrayLinks);
      arrayAllPromises.push(allPromises);
    });

    if (options.validate && options.stats) {
      Promise.all(arrayAllPromises)
        .then((response) => {
          const statsAndBrokenLinks = { ...stats(response.flat()), ...statsBroken(response.flat()) };
          resolve(statsAndBrokenLinks);
        });
      return;
    }

    if (options.validate) {
      Promise.all(arrayAllPromises)
        .then((response) => {
          resolve(response.flat());
        });
      return;
    }

    if (options.stats) {
      Promise.all(arrayAllPromises)
        .then((response) => {
          const statsOfLinks = stats(response.flat());
          resolve(statsOfLinks);
        });
      return;
    }

    resolve(arrayJustLinks.flat());
  }

  // SI LA RUTA ES UN ARCHIVO
  if (mdFileExtension(pathAbsolute) === '.md') {
    const arrayLinks = getLinks(pathAbsolute);

    const allPromises = validateUrlStatus(arrayLinks);
    arrayAllPromises.push(allPromises);

    if (options.validate && options.stats) {
      Promise.all(arrayAllPromises)
        .then((response) => {
          const statsAndBrokenLinks = { ...stats(response.flat()), ...statsBroken(response.flat()) };
          resolve(statsAndBrokenLinks);
        });
      return;
    }

    if (options.validate) {
      validateUrlStatus(arrayLinks).then((res) => resolve(res));
      return;
    }

    if (options.stats) {
      const statsOfLinks = stats(arrayLinks);
      resolve(statsOfLinks);
      return;
    }

    resolve(arrayLinks);
  }
});

mdLinks('Directory', { validate: true, stats: true })
  .then((response) => {
    console.log('resolve de la promesa de mdlinks =>----', response);
  })
  .catch((error) => {
    console.log('este es el error de la promesa mdlinks =>----', error);
  });

module.exports = {
  mdLinks,
};
