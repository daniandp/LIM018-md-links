const fs = require('fs');
const path = require('path');
const axios = require('axios');

// FUNCIÓN PARA VALIDAR SI LA RUTA EXISTE
const routeExists = (pathFile) => fs.existsSync(pathFile);

// FUNCIÓN PARA VALIDAR SI LA RUTA ES ABSOLUTA Y SI ES RELATIVA, CONVIERTE A ABSOLUTA
const routeAbsolute = (pathFile) => (path.isAbsolute(pathFile) ? pathFile : path.resolve(pathFile));

// FUNCIÓN PARA VALIDAR SI LA EXTENSIÓN DEL ARCHIVO ES MARKDOWN
const mdFileExtension = (pathFile) => path.extname(pathFile);

// FUNCIÓN PARA VALIDAR SI ES UN DIRECTORIO
const isADirectory = (pathFile) => fs.statSync(pathFile).isDirectory();

// FUNCIÓN PARA VALIDAR SI ES UN ARCHIVO
/* const isAFile = (pathFile) => fs.lstatSync(pathFile).isFile(); */

// FUNCIÓN PARA LEER EL DIRECTORIO
const readDirectory = (pathFile) => fs.readdirSync(pathFile);

// FUNCIÓN PARA LEER EL ARCHIVO
// const readFile = (pathFile) => fs.readFileSync(pathFile, 'utf-8');

// FUNCIÓN PARA EXTRAER LOS LINKS EN EL ARCHIVO MARKDOWN
const getLinks = (pathFile) => {
  const arrayOfLinks = [];
  const readingFiles = fs.readFileSync(pathFile, 'utf-8');
  const regExp = /\[(.*?)\]\(.*?\)/gm;
  if (readingFiles !== '') {
    const urlsFound = readingFiles.match(regExp);
    if (urlsFound !== null) {
      urlsFound.map((url) => {
        const text = url.slice(1, url.indexOf(']'));
        const objOfLinks = {
          href: url.slice(url.indexOf(']') + 2, url.length - 1), // URL encontrada
          text, // texto qe aparecía dentro del link
          file: pathFile, // ruta del archivo donde se encontró el link entre []
        };
        return arrayOfLinks.push(objOfLinks);
      });
    }
  }
  const filteredLinks = arrayOfLinks.filter((url) => url.href.startsWith('http'));
  return filteredLinks; // retorna un array de objetos con los links que contenga el archivo
};

// FUNCIÓN PARA VALIDAR EL STATUS DE LOS LINKS CON PETICIONES HTTP
const validateUrlStatus = (arrayOfLinks) => {
  const savedLinks = arrayOfLinks; // array de objetos con los links del documento
  const arrayLinksPromises = [];
  for (let i = 0; i < savedLinks.length; i += 1) {
    const validateLinks = axios.get(savedLinks[i].href)
      .then((response) => {
        savedLinks[i].status = response.status;
        savedLinks[i].message = response.statusText;
        return savedLinks[i];
      })
      .catch((error) => {
        if (error.response) {
          savedLinks[i].status = error.response.status;
          savedLinks[i].message = 'FAIL';
        } else {
          savedLinks[i].status = error.errno;
          savedLinks[i].message = 'FAIL';
        }
        return savedLinks[i];
      });
    arrayLinksPromises.push(validateLinks);
  }
  return Promise.all(arrayLinksPromises); // retorna todas las promesas, un array de objetos con una promesa por cada link
};

// FUNCIÓN RECURSIVA PARA LEER DIRECTORIOS Y ENCONTRAR ARCHIVOS MARKDOWN EN ÉL
const findFilesInDir = (pathDir) => {
  let arrayAllFiles = [];
  /*  if (!isADirectory(pathDir)) {
    return [pathDir]; // si no es un directorio(false), retorna solo la ruta del archivo
  } */
  // leyendo el directorio para encontrar archivos
  const listOfFiles = readDirectory(pathDir);
  listOfFiles.forEach((file) => {
    const fullPath = path.join(pathDir, file);
    if (isADirectory(fullPath)) {
      const readDirAgain = findFilesInDir(fullPath);
      arrayAllFiles = arrayAllFiles.concat(readDirAgain);
    } else if (mdFileExtension(fullPath) === '.md') {
      arrayAllFiles.push(fullPath);
    }
  });
  return arrayAllFiles; // retorna un array con las rutas de los archivos markdown que están dentro del directorio
};

// console.log(findFilesInDir('Directory'));

// FUNCIÓN PARA OBTENER ESTADÍSTICAS DE LOS URLS
const stats = (arrayOfLinks) => {
  const total = arrayOfLinks.length;
  const unique = new Set(arrayOfLinks.map((url) => url.href)).size;
  return {
    Total: total,
    Unique: unique,
  };
};

const statsBroken = (arrayOfLinks) => {
  const broken = arrayOfLinks.filter((url) => url.message === 'FAIL').length;
  return {
    Broken: broken,
  };
};

module.exports = {
  routeExists,
  routeAbsolute,
  mdFileExtension,
  isADirectory,
  /*  isAFile, */
  readDirectory,
  /*  readFile, */
  getLinks,
  validateUrlStatus,
  findFilesInDir,
  stats,
  statsBroken,
};

// regex diana = /\[([^\[]+)\](\(.*\))/gm;
// regex bella = /\[(.*?)\]\(.*?\)/gm; */
