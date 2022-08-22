const fs = require('fs');
const path = require('path');
/* const axios = require('axios').default; */

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
      href: url.slice(url.indexOf(']') + 2, url.length - 1),
      text,
      file,
    };
    return arrayOfLinks.push(objOfLinks);
  });
  return arrayOfLinks;
};

getLinks('prueba.md');
console.log('aqui', getLinks('prueba.md'));

module.exports = {
  routeExists,
  routeAbsolute,
  mdFileExtension,
  readFile,
  getLinks,
};

// regex diana = /\[([^\[]+)\](\(.*\))/gm;
// regex bella = /\[(.*?)\]\(.*?\)/gm; */
