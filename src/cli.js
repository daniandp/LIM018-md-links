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

if (options.length === 1 && (options[0] === '--help' || options[0] === '-h')) {
  console.log(console.log`
  ╔═══════════════════════════════════════════════════════════════════════════════════════════════════════╗
                                              md-links-daniandp
    Opciones válidas:
    
    ● path: Al ingresar solo la ruta del archivo o directorio, obtendrá información general sobre los 
    links encontrados en los archivo, con el siguiente formato:
        -href: URL encontrada
        -text: Texto qe aparecía dentro del link
        -file: ruta del archivo donde se encontró el link

    ● --validate / -v: para saber el status de los links haciendo consultas HTTP con axios, obtendrá
    la información con el siguiente formato:
        -href: URL encontrada
        -text: Texto qe aparecía dentro del link
        -file: ruta del archivo donde se encontró el link
        -status: código de respuesta HTTP
        -message: OK en caso de éxito o FAIL en caso de fallo

    ● --stats / -s: para obtener estadísticas de los links únicos y totales encontrados, obtendrá
    la información con el siguiente formato:
        -Total: cantidad total de los links encontrados
        -Unique: cantidad de links únicos

    ● --validate --stats / -v -s: para obtener estadísticas de los links únicos, totales y rotos,
    obtendrá la información con el siguiente formato:
        -Total: cantidad total de los links encontrados
        -Unique: cantidad de links únicos
        -Broken: cantidad de links rotos

  ╚═══════════════════════════════════════════════════════════════════════════════════════════════════════╝`);
}

// SI MDLINLKS SE INVOCA SOLO CON LA RUTA
if (options.length === 1 && options[0]) {
  mdLinks(path, { validate: false, stats: false })
    .then((response) => {
      response.forEach((url) => {
        console.log(
          url.href,
          '═══',
          url.text,
          '═══',
          url.file,
          '\n════════════════════════════════════════════════════════════════════════════════════ ● ════════════════════════════════════════════════════════════════════════════════════ ',
        );
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
        console.log(
          url.href,
          '═══',
          url.text,
          '═══',
          url.file,
          '═══',
          url.status,
          '═══',
          url.message,
          '\n═════════════════════════════════════════════════════════════════════════════════════════════════ ● ═════════════════════════════════════════════════════════════════════════════════════════════════ ',
        );
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

    ╔══════════════════════════════════════════════════════════════════════════════════════════╗
   
                para validar el status de los links ═════➤  --validate o -v
        ══════════════════════════════════════════════════════════════════════════════════
                para links únicos y totales ═════════════➤  --stats o -s
        ══════════════════════════════════════════════════════════════════════════════════
                para links únicos, totales y rotos ══════➤  --validate --stats o -v -s
        ══════════════════════════════════════════════════════════════════════════════════
                para ayuda o más información ════════════➤  --help o -h

    ╚══════════════════════════════════════════════════════════════════════════════════════════╝
   `);
}
