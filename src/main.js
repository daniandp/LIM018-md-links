const { default: axios } = require('axios');
const fs = require('fs');
const path = require('path');
/* const axios = require('axios'); */

// FUNCIÓN PARA VALIDAR SI LA RUTA EXISTE
const routeExists = (pathFile) => fs.existsSync(pathFile);

// FUNCIÓN PARA VALIDAR SI LA RUTA ES ABSOLUTA Y SI ES RELATIVA, CONVIERTE A ABSOLUTA
const routeAbsolute = (pathFile) => (path.isAbsolute(pathFile) ? pathFile : path.resolve(pathFile));

// FUNCIÓN PARA SABER SI LA EXTENSIÓN DEL ARCHIVO ES MARKDOWN
const mdFileExtension = (pathFile) => path.extname(pathFile);

// FUNCIÓN PARA LEER EL ARCHIVO MARKDOWN
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
  return arrayOfLinks;
};

// FUNCIÓN PARA VALIDAR EL STATUS DE LOS LINKS CON PETICIONES HTTP
const validateUrlStatus = (url) => {
  axios.get(url)
    .then((response) => {
      console.log('UNO', response.status);
      console.log('DOS', response.statusText);
    })
    .catch((error) => {
      console.log('TRES', error);
    });
};

// console.log(getLinks('prueba.md'));
console.log('CUATRO', validateUrlStatus('https://es.wikipedia.org/wiki/Markdown'));

module.exports = {
  routeExists,
  routeAbsolute,
  mdFileExtension,
  readFile,
  getLinks,
  validateUrlStatus,
};

// regex diana = /\[([^\[]+)\](\(.*\))/gm;
// regex bella = /\[(.*?)\]\(.*?\)/gm; */
