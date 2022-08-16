const fs = require('fs');
const path = require('path');
/* const path = require('path'); */

// FUNCIÓN PARA VALIDAR SI LA RUTA EXISTE
const routeExists = (pathFile) => fs.existsSync(pathFile);

// FUNCIÓN PARA VALIDAR SI LA RUTA ES ABSOLUTA
const routeAbsolute = (pathFile) => path.isAbsolute(pathFile);

// FUNCIÓN PARA SABER SI LA EXTENSIÓN DEL ARCHIVO ES .MD
const mdFile = (fileExt) => path.extname(fileExt);

// FUNCIÓN PARA LEER EL ARCHIVO
const readFile = (pathFile, typeDocument) => fs.readFileSync(pathFile, typeDocument);

/* const matchUrl = /http([^"'\s]+)/ig;

const readDocument = fs.readFileSync('./prueba.md', 'utf-8');
console.log('ACÁ ESTOY =>', readDocument);
const urlFound = readDocument.match(matchUrl);
console.log(urlFound); */

module.exports = {
  routeExists,
  routeAbsolute,
  mdFile,
  readFile,
  /* readDocument,
  urlFound, */
};
