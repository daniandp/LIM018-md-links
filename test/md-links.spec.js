const {
  routeExists,
  routeAbsolute,
  mdFileExtension,
  isADirectory,
  /*  isAFile, */
  readDirectory,
  readFile,
  getLinks,
  validateUrlStatus,
  findFilesInDir,
  statsOfUrls,
} = require('../src/main');

jest.mock('axios');

describe('routeExists', () => {
  it('Si la ruta proporcionada existe, debe retornar true', () => {
    expect(routeExists('Directory/DirPrueba/prueba.md')).toBe(true);
    expect(routeExists('Directory/DirPrueba/prueba.')).toBe(false);
  });
});

describe('routeAbsolute', () => {
  it('Si la ruta existe, debe retornar la ruta absoluta del archivo, si la ruta es relativa la convierte en absoluta', () => {
    const pathAbsolute = 'D:\\Casa\\Google Drive\\Daniela Andrade\\LABORATORIA\\LIM018-md-links\\Directory\\DirPrueba\\prueba.md';
    expect(routeAbsolute(pathAbsolute)).toBe(pathAbsolute);
    expect(routeAbsolute('Directory/DirPrueba/prueba.md')).toBe(pathAbsolute);
  });
});

describe('mdFileExtension', () => {
  it('Si el archivo es tipo markdown, debe retornar .md', () => {
    expect(mdFileExtension('Directory/DirPrueba/prueba.md')).toBe('.md');
  });
});

describe('isADirectory', () => {
  it('Si la ruta corresponde a un directorio, debe retortar true, si es un archivo retorna false', () => {
    expect(isADirectory('Directory')).toBe(true);
    expect(isADirectory('Directory/DirPrueba/prueba.md')).toBe(false);
  });
});

/* describe('isAFile', () => {
  it('Si la ruta corresponde a un archivo, debe retortar true, si es un directorio retorna false', () => {
    expect(isAFile('Directory/DirPrueba/prueba.md')).toBe(true);
    expect(isAFile('D:/Casa/Google Drive/Daniela Andrade/LABORATORIA/LIM018-md-links/Directory')).toBe(false);
  });
}); */

describe('readDirectory', () => {
  it('Lee el directorio y retorna un array con los archivos que tiene dentro', () => {
    const directoryContent = ['archivo.md', 'DirPrueba'];
    expect(readDirectory('Directory')).toEqual(directoryContent);
  });
});

describe('readFile', () => {
  it('Lee el archivo y retorna una cadena con el contenido del archivo markdown', () => {
    const fileContent = 'Hola mundo 2 [Node.js](https://nodejs.org/)';
    expect(readFile('Directory/DirPrueba/prueba2.md')).toBe(fileContent);
  });
});

describe('getLinks', () => {
  it('Retorna un array de objetos, un objeto por cada link encontrado, con las propiedades href, text y file', () => {
    const link = [{
      href: 'https://nodejs.org/',
      text: 'Node.js',
      file: 'Directory/DirPrueba/prueba2.md',
    }];
    expect(getLinks('Directory/DirPrueba/prueba2.md')).toStrictEqual(link);
  });
});

describe('validateUrlStatus', () => {
  it('Hace la consulta HTTP de cada link y retorna status 200 y el message OK de cada uno como propiedades dentro del objeto de cada link', (done) => {
    const responseLink = [{
      href: 'https://nodejs.org/',
      text: 'Node.js',
      file: 'Directory/DirPrueba/prueba2.md',
      status: 200,
      message: 'OK',
    }];
    const arrayLinksPromises = validateUrlStatus('Directory/DirPrueba/prueba2.md');
    Promise.all(arrayLinksPromises)
      .then((response) => {
        expect(response).toStrictEqual(responseLink);
        done();
      });
  });
  it('Hace la consulta HTTP de cada link y retorna status 404 y el message FAIL de cada uno como propiedades dentro del objeto de cada link', (done) => {
    const arrayTest = [{
      href: 'https://nodejs.org/e',
      text: 'Node.js',
      file: 'Directory/DirPrueba/prueba2.md',
    }];
    const responseLink = [{
      href: 'https://nodejs.org/e',
      text: 'Node.js',
      file: 'Directory/DirPrueba/prueba2.md',
      status: 404,
      message: 'FAIL',
    }];
    const arrayLinksPromises = validateUrlStatus(arrayTest);
    Promise.all(arrayLinksPromises)
      .catch((error) => {
        expect(error).toStrictEqual(responseLink);
        done();
      });
  });
});

describe('findFilesInDir', () => {
  it('Lee un directorio y retorna un array con las rutas de los documentos que se encuentran dentro del directorio', () => {
    const arrayDirPaths = [
      'Directory\\archivo.md',
      'Directory\\DirPrueba\\prueba.md',
      'Directory\\DirPrueba\\prueba.txt',
      'Directory\\DirPrueba\\prueba2.md'];
    expect(findFilesInDir('Directory')).toStrictEqual(arrayDirPaths);
  });
});

describe('statsOfUrls,', () => {
  it('Si el usuario escoge la opción --stats, retorna un objeto con la cantidad de links totales y únicos', () => {
    const arrayTest = [{
      href: 'https://nodejs.org/e',
      text: 'Node.js',
      file: 'Directory/DirPrueba/prueba2.md',
    }];

    const objectTest = {
      total: 1,
      unique: 1,
    };
    expect(statsOfUrls(arrayTest)).toStrictEqual(objectTest);
  });
});

/* const mdLinks = require('../');

describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

}); */
