const {
  routeExists, routeAbsolute, mdFile, readFile, /* readDocument, urlFound */
  // eslint-disable-next-line import/extensions
} = require('./main.js');

const pathAbsolute = 'D:/Casa/Google Drive/Daniela Andrade/LABORATORIA/LIM018-md-links/prueba.md';
const pathRelative = 'prueba.md';
const documentNoMd = 'prueba.txt';
const pathNotExist = 'documento.md';

// FUNCIÓN PARA VALIDAR RUTAS
const path = (pathFile) => {
  if (routeExists(pathFile)) {
    if (mdFile(pathFile) !== '.md') {
      return 'No se encontró un archivo .md';
    }
  } else {
    return 'La ruta ingresada es inválida';
  }
  return readFile(pathFile, 'utf-8');
};

// FUNCIÓN PARA LEER EL ARCHIVO
/* const readingFile = (pathFile) => {
  if ((path(pathFile) !== true) && (path(pathFile) !== '.md')) {
    return 'No se puede leer el archivo, ingrese un archivo o ruta válida';
  }
  return readFile(pathFile, 'utf-8');
}; */

path(pathRelative);
console.log(path(pathAbsolute));
/* readingFile(pathRelative, 'utf-8');
console.log(readingFile(documentNoMd, 'utf-8')); */

/* console.log('el archivo es .md?', path(documentNoMd));
 */
/* path(documentNoMd);
console.log('el archivo es .md?', documentNoMd); */
/* routeExists(pathAbsolute);
console.log('existe la ruta?', routeExists(pathAbsolute));
routeAbsolute(pathRelative);
console.log('la ruta es absoluta?', routeAbsolute(pathAbsolute));
mdFile(documentNoMd);
console.log('el archivo es .md?', mdFile(pathRelative));
readFile(pathRelative, 'utf-8');
console.log('CONTENIDO DEL DOCUMENTO =>', readFile(pathRelative, 'utf-8')); */
