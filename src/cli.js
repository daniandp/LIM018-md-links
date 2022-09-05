#!/usr/bin/env node

const { mdLinks } = require('./mdLinks');
// const chalk = require('chalk');

const options = process.argv.slice(2); // array [] de las opciones que se ingresan, comienza en posición 0 con la ruta
const path = options[0]; // es la ruta ingresada

// SI NO SE INGRESA NINGUNA RUTA
if (options.length === 0) {
  console.log(`Ingrese la ruta de un archivo markdown o directorio que contenga
archivos markdown, por ejemplo ══════════════════➤  Directory/archivo.md`);
}

// SI MDLINLKS SE INVOCA SOLO CON LA RUTA
if (options.length === 1 && options[0]) {
  mdLinks(path, { validate: false, stats: false })
    .then((response) => {
      response.forEach((url) => {
        console.log(url.href, '═══════', url.text, '═══════', url.file);
      });
    })
    .catch((error) => {
      console.log(error.message);
    });

  // SI SE INVOCA MDLINKS CON VALIDATE Y STATS
} else if (options[0] && (options[1] === '--validate' || options[1] === '-v') && (options[2] === '--stats' || options[2] === '-s')) {
  mdLinks(path, { validate: true, stats: true })
    .then((response) => {
      console.log(' Total: ', response.Total, '\n Unique:', response.Unique, '\n Broken:', response.Broken);
    })
    .catch((error) => {
      console.log(error.message);
    });

  // SI SE INVOCA MDLINKS CON VALIDATE
} else if (options[0] && (options[1] === '--validate' || options[1] === '-v')) {
  mdLinks(path, { validate: true, stats: false })
    .then((response) => {
      response.forEach((url) => {
        console.log(url.href, '═══════', url.text, '═══════', url.file, '═══════', url.status, '═══════', url.message);
      });
    })
    .catch((error) => {
      console.log(error.message);
    });

  // SI SE INVOCA MDLINKS CON STATS
} else if (options[0] && (options[1] === '--stats' || options[1] === '-s')) {
  mdLinks(path, { validate: false, stats: true })
    .then((response) => {
      console.log(' Total: ', response.Total, '\n Unique:', response.Unique);
    })
    .catch((error) => {
      console.log(error.message);
    });

  // SI SE INVOCA MDLINKS CON OPCIONES INVÁLIDAS
} else if ((options[1] !== '--validate' || options[2] !== '--stats')) {
  console.log(`Ingrese opciones válidas, por ejemplo:

 ╔═══════════════════════════════════════════════════════════════════════════════════════════════════════╗
   para validar el status de los links ═════➤  --validate o -v
   ═════════════════════════════════════════════════════════════════════════════════════════════════════
   para links únicos y totales ═════════════➤  --stats o -s
   ═════════════════════════════════════════════════════════════════════════════════════════════════════
   para links únicos, totales y rotos ══════➤  --validate --stats o -v -s
 ╚═══════════════════════════════════════════════════════════════════════════════════════════════════════╝
   `);
}

// SI SE INVOCA MDLINKS CON VALIDATE
/* if (options.length === 2 && options[0]) {
  if ((options[1] === '--validate') || (options[1] === '-v')) {
    mdLinks(path, { validate: true, stats: false })
      .then((response) => {
        response.forEach((url) => {
          console.log(url.href, '═══════', url.text, '═══════', url.file, '═══════', url.status, '═══════', url.message);
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
} */

// SI SE INVOCA MDLINKS CON STATS
/* if (options.length === 2 && options[0]) {
  if ((options[1] === '--stats') || (options[1] === '-s')) {
    mdLinks(path, { validate: false, stats: true })
      .then((response) => {
        console.log(' Total: ', response.Total, '\n Unique:', response.Unique);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
}
 */
// SI SE INVOCA MDLINKS CON VALIDATE Y STATS
/* if (options.length === 3 && options[0]) {
  if ((options[1] === '--validate' || options[1] === '-v') && (options[2] === '--stats' || options[2] === '-s')) {
    mdLinks(path, { validate: true, stats: true })
      .then((response) => {
        console.log(' Total: ', response.Total, '\n Unique:', response.Unique, '\n Broken:', response.Broken);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
} */

// SI SE INVOCA MDLINKS CON STATS Y VALIDATE
/* if (options.length === 3 && options[0]) {
  if ((options[2] === '--validate' || options[2] === '-v') && (options[1] === '--stats' || options[1] === '-s')) {
    mdLinks(path, { validate: true, stats: true })
      .then((response) => {
        console.log(' Total: ', response.Total, '\n Unique:', response.Unique, '\n Broken:', response.Broken);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
} */

// SI SE INVOCA MDLINKS CON OPCIONES INVÁLIDAS
/* if (options.length === 2) {
  if ((options[1] !== '--validate' && options[1] !== '-v') || (options[2] !== '--stats' && options[2] !== '-s' && options[1] !== '--stats' && options[1] !== '-s')) {
    console.log(`Ingrese opciones válidas, por ejemplo:

  ╔═══════════════════════════════════════════════════════════════════════════════════════════════════════╗
    para validar el status de los links: --validate o -v
    ═════════════════════════════════════════════════════════════════════════════════════════════════════
    para links únicos y totales: --stats o -s
    ═════════════════════════════════════════════════════════════════════════════════════════════════════
    para links únicos, totales y rotos: --validate --stats o -v -s, también puede invertir las posiciones
  ╚═══════════════════════════════════════════════════════════════════════════════════════════════════════╝
    `);
  }
} */
