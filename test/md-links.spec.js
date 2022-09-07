const axios = require('axios');
const {
  routeExists,
  routeAbsolute,
  mdFileExtension,
  isADirectory,
  readDirectory,
  getLinks,
  validateUrlStatus,
  findFilesInDir,
  stats,
  statsBroken,
} = require('../src/main');

const { mdLinks } = require('../src/mdLinks');

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

describe('readDirectory', () => {
  it('Lee el directorio y retorna un array con los archivos que tiene dentro', () => {
    const directoryContent = ['archivo.md', 'DirPrueba'];
    expect(readDirectory('Directory')).toEqual(directoryContent);
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
    const arrayOfLinks = [{
      href: 'https://nodejs.org/',
      text: 'Node.js',
      file: 'Directory/DirPrueba/prueba2.md',
    }];
    const responseLink = [{
      href: 'https://nodejs.org/',
      text: 'Node.js',
      file: 'Directory/DirPrueba/prueba2.md',
      status: 200,
      message: 'OK',
    }];

    axios.get.mockResolvedValue({
      status: 200,
      statusText: 'OK',
    });

    const arrayAllPromises = validateUrlStatus(arrayOfLinks);
    Promise.all(arrayAllPromises)
      .then((response) => {
        expect(response).toStrictEqual(responseLink);
        done();
      });
  });
  it('Hace la consulta HTTP de cada link y retorna status 404 y el message FAIL de los links rotos', (done) => {
    const arrayTest = [{
      href: 'https://nodejs.org/e',
      text: 'Node.js',
      file: 'Directory/DirPrueba/prueba.md',
    }];
    const responseLink = [{
      href: 'https://nodejs.org/e',
      text: 'Node.js',
      file: 'Directory/DirPrueba/prueba.md',
      status: 404,
      message: 'FAIL',
    }];

    axios.get.mockRejectedValue({
      response: {
        status: 404,
      },
    });

    const arrayLinksPromises = validateUrlStatus(arrayTest);
    Promise.all(arrayLinksPromises)
      .then((response) => {
        expect(response).toStrictEqual(responseLink);
        done();
      });
  });

  it('Hace la consulta HTTP de cada link y retorna status -3008 y el message FAIL de los links rotos', (done) => {
    const arrayTest = [{
      href: 'https://nodejs./',
      text: 'Node.js',
      file: 'Directory/DirPrueba/prueba.md',
    }];
    const responseLink = [{
      href: 'https://nodejs./',
      text: 'Node.js',
      file: 'Directory/DirPrueba/prueba.md',
      status: -3008,
      message: 'FAIL',
    }];

    axios.get.mockRejectedValue({
      response: {
        status: -3008,
      },
    });

    const arrayLinksPromises = validateUrlStatus(arrayTest);
    Promise.all(arrayLinksPromises)
      .then((response) => {
        expect(response).toStrictEqual(responseLink);
        done();
      });
  });
});

describe('findFilesInDir', () => {
  it('Lee un directorio y retorna un array con las rutas de los documento markdown que se encuentran dentro del directorio', () => {
    const arrayJustMdPaths = [
      'Directory\\archivo.md',
      'Directory\\DirPrueba\\prueba.md',
      'Directory\\DirPrueba\\prueba2.md'];
    expect(findFilesInDir('Directory')).toStrictEqual(arrayJustMdPaths);
  });
});

describe('stats', () => {
  it('Si el usuario escoge la opción --stats, retorna un objeto con la cantidad de links totales y únicos', () => {
    const arrayTest = [{
      href: 'https://nodejs.org/',
      text: 'Node.js',
      file: 'Directory/DirPrueba/prueba2.md',
    }];

    const objectTest = {
      Total: 1,
      Unique: 1,
    };
    expect(stats(arrayTest)).toStrictEqual(objectTest);
  });
});

describe('statsBroken', () => {
  it('Si el usuario escoge las opciones --stats --validate, retorna un objeto con la cantidad de links rotos', () => {
    const arrayTest = [{
      href: 'https://nodejs.org/e',
      text: 'Node.js',
      file: 'Directory/DirPrueba/prueba2.md',
      status: 404,
      message: 'FAIL',
    }];

    const objectTest = {
      Broken: 1,
    };
    expect(statsBroken(arrayTest)).toStrictEqual(objectTest);
  });
});

describe('mdLinks', () => {
  it('Si la ruta no existe, retorna un mensaje indicando que la ruta ingresada no existe', () => {
    mdLinks('Directory/archiv.md', { validate: false })
      .catch((error) => {
        expect(error).toStrictEqual(new Error('La ruta ingresada no existe, por favor ingrese una ruta válida'));
      });
  });

  it('Si la ruta es un directorio y validate es true y stats es true', () => {
    const objResponse = { Total: 8, Unique: 6, Broken: 2 };
    axios.get.mockResolvedValue({
      status: 200,
      statusText: 'OK',
    }).mockRejectedValueOnce({
      status: 404,
    }).mockRejectedValueOnce({
      status: -3008,
    });

    mdLinks('Directory', { validate: true, stats: true })
      .then((response) => {
        expect(response).toStrictEqual(objResponse);
      });
  });

  it('Si la ruta es un directorio y stats es true', () => {
    const objResponse = { Total: 8, Unique: 6 };
    axios.get.mockResolvedValue({
      status: 200,
      statusText: 'OK',
    });

    mdLinks('Directory', { validate: false, stats: true })
      .then((response) => {
        expect(response).toStrictEqual(objResponse);
      });
  });

  it('Si la ruta es un archivo y validate es true y stats es true', () => {
    const objResponse = { Total: 2, Unique: 2, Broken: 1 };
    axios.get.mockResolvedValueOnce({
      status: 200,
      statusText: 'OK',
    }).mockRejectedValueOnce({
      status: 404,
    });

    mdLinks('Directory/archivo.md', { validate: true, stats: true })
      .then((response) => {
        expect(response).toStrictEqual(objResponse);
      });
  });

  it('Si la ruta es un archivo y validate es true', (done) => {
    const responseLinks = [
      {
        href: 'https://www.npmjs.com/',
        text: 'Sitio oficial de npm (en inglés)',
        file: 'D:\\Casa\\Google Drive\\Daniela Andrade\\LABORATORIA\\LIM018-md-links\\Directory\\archivo.md',
        status: 200,
        message: 'OK',
      },
      {
        href: 'https://developers.google.com/v8/',
        text: 'motor de JavaScript V8 de Chrome',
        file: 'D:\\Casa\\Google Drive\\Daniela Andrade\\LABORATORIA\\LIM018-md-links\\Directory\\archivo.md',
        status: 200,
        message: 'OK',
      },
    ];

    axios.get.mockResolvedValue({
      status: 200,
      statusText: 'OK',
    });

    mdLinks('D:\\Casa\\Google Drive\\Daniela Andrade\\LABORATORIA\\LIM018-md-links\\Directory\\archivo.md', { validate: true, stats: false })
      .then((response) => {
        expect(response).toStrictEqual(responseLinks);
        done();
      });
  });

  it('Si la ruta es un archivo y stats es true', () => {
    const objResponse = { Total: 2, Unique: 2 };
    axios.get.mockResolvedValue({
      status: 200,
      statusText: 'OK',
    });

    mdLinks('Directory/archivo.md', { validate: false, stats: true })
      .then((response) => {
        expect(response).toStrictEqual(objResponse);
      });
  });
});
