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
const isADirectory = (pathFile) => fs.lstatSync(pathFile).isDirectory();

// FUNCIÓN PARA VALIDAR SI ES UN ARCHIVO
const isAFile = (pathFile) => fs.lstatSync(pathFile).isFile();

// FUNCIÓN PARA LEER EL DIRECTORIO
const readDirectory = (pathFile) => fs.readdirSync(pathFile);

// FUNCIÓN PARA LEER EL ARCHIVO
const readFile = (pathFile) => fs.readFileSync(pathFile, 'utf-8');

// FUNCIÓN PARA EXTRAER LOS LINKS EN EL ARCHIVO MARKDOWN
const getLinks = (file) => {
  const arrayOfLinks = [];
  const readingFiles = readFile(file, 'utf-8');
  const regExp = /\[(.*?)\]\(.*?\)/gm;
  const urlsFound = readingFiles.match(regExp);
  urlsFound.map((url) => {
    const text = url.slice(1, url.indexOf(']'));
    const objOfLinks = {
      href: url.slice(url.indexOf(']') + 2, url.length - 1), // URL encontrada
      text, // texto qe aparecía dentro del link
      file, // ruta del archivo donde se encontró el link entre []
    };
    return arrayOfLinks.push(objOfLinks);
  });
  const filteredLinks = arrayOfLinks.filter((url) => url.href.startsWith('http'));
  return filteredLinks;
};

// FUNCIÓN PARA VALIDAR EL STATUS DE LOS LINKS CON PETICIONES HTTP
const validateUrlStatus = (pathFile) => {
  const savedLinks = getLinks(pathFile);
  const arrayLinksPromises = [];
  for (let i = 0; i < savedLinks.length; i += 1) {
    const validateLinks = axios.get(savedLinks[i].href)
      .then((response) => {
        savedLinks[i].status = response.status;
        savedLinks[i].message = (response.status >= 200) && (response.status <= 399) ? response.statusText : 'FAIL';
        return savedLinks[i];
      })
      .catch((error) => {
        savedLinks[i].status = `${error}`;
        savedLinks[i].message = 'FAIL';
        return savedLinks[i];
      });
    arrayLinksPromises.push(validateLinks);
  }
  return arrayLinksPromises;
};

// FUNCIÓN RECURSIVA PARA LEER DIRECTORIOS Y ENCONTRAR ARCHIVOS EN ÉL
const findFilesInDir = (pathDir) => {
  const arrayAllFiles = [];
  if (isAFile(pathDir)) {
    return [pathDir];
  }
  const readDir = readDirectory(pathDir);
  readDir.forEach((file) => {
    const fullPath = path.join(pathDir, file);
    arrayAllFiles.push(findFilesInDir(fullPath));
  });
  return arrayAllFiles.flat();
};

/* const validateUrlStatus = (arrayOfLinks) => {
  const linkStatus = arrayOfLinks.map((links) => axios.get(links.href)
    .then((response) => ({
      status: response.status,
      statusText: response.statusText,
    }))
    .catch(() => ({
      status: 'ERROR',
      statusText: 'FAIL',
    })));
  return Promise.all(linkStatus);
}; */

// console.log(getLinks('prueba.md'));
/* validateUrlStatus('https://nodejs.org/').then((response) => {
  console.log(response.status, response.statusText);
}); */

module.exports = {
  routeExists,
  routeAbsolute,
  mdFileExtension,
  isADirectory,
  isAFile,
  readDirectory,
  readFile,
  getLinks,
  validateUrlStatus,
  findFilesInDir,
};

// regex diana = /\[([^\[]+)\](\(.*\))/gm;
// regex bella = /\[(.*?)\]\(.*?\)/gm; */
