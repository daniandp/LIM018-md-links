#!/usr/bin/env node
// const process = require('node:process');

const { table } = require('table');
const { mdLinks } = require('./mdLinks');
// const chalk = require('chalk');
// const cFonts = require('cfonts');

const options = process.argv.slice(2);
console.log('OPTIONS', options); // array [] de las opciones que se ingresan, comienza en posición 0 con la ruta
const path = options[0]; // es la ruta ingresada

// SI NO SE INGRESA NINGUNA RUTA
if (options.length === 0) {
  console.log('Ingrese una ruta de un directorio o archivo markdown');
}

// SI MDLINLKS SE INVOCA POR DEFAULT, SOLO LA RUTA
if (options.length === 1 && options[0]) {
  mdLinks(path, { validate: false, stats: false })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

// SI SE INVOCA MDLINKS Y VALIDATE
if (options.length === 2 && options[0]) {
  if ((options[1] === '--validate') || (options[1] === '-v')) {
    mdLinks(path, { validate: true })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
}

// SI SE INVOCA MDLINKS Y STATS
if (options.length === 2 && options[0]) {
  if ((options[1] === '--stats') || (options[1] === '-s')) {
    mdLinks(path, { stats: true })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
}

// SI SE INVOCA MDLINKS, VALIDATE Y STATS
if (options.length === 3 && options[0]) {
  if ((options[1] === '--validate' || options[1] === '-v') && (options[2] === '--stats' || options[2] === '-s')) {
    mdLinks(path, { validate: true, stats: true })
      .then((response) => {
        console.log(' Total: ', response.Total, '\n Unique:', response.Unique, '\n Broken:', response.Broken);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
}

// SI SE INVOCA MDLINKS, STATS Y VALIDATE
if (options.length === 3 && options[0]) {
  if ((options[2] === '--validate' || options[2] === '-v') && (options[1] === '--stats' || options[1] === '-s')) {
    mdLinks(path, { validate: true, stats: true })
      .then((response) => {
        console.log(' Total: ', response.Total, '\n Unique:', response.Unique, '\n Broken:', response.Broken);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
}

// SI SE INVOCA MDLINKS CON OPCIONES INVÁLIDAS
/* if (options.length > 1) {
  if ((options[1] !== '--validate' || options[1] !== '-v') && (options[2] !== '--stats' || options[2] !== '-s')) {
    console.log('Ingrese opciones válidas o ingrese --help/-h para obtener ayuda');
  }
}
 */
