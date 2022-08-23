const {
  routeExists, routeAbsolute, mdFileExtension, readFile, getLinks,
} = require('../src/main');

describe('routeExists', () => {
  it('Valida que la ruta proporcionada exista', () => {
    expect(routeExists('prueba.md')).toBe(true);
    expect(routeExists('prueba.m')).toBe(false);
  });
});

describe('routeAbsolute', () => {
  it('Si la ruta existe, debe retornar la ruta absoluta del archivo, si la ruta es relativa la convierte en absoluta', () => {
    const pathAbsolute = 'D:\\Casa\\Google Drive\\Daniela Andrade\\LABORATORIA\\LIM018-md-links\\prueba.md';
    expect(routeAbsolute(pathAbsolute)).toBe(pathAbsolute);
    expect(routeAbsolute('prueba.md')).toBe(pathAbsolute);
  });
});

describe('mdFileExtension', () => {
  it('Si el archivo es tipo markdown, debe retornar .md', () => {
    expect(mdFileExtension('prueba.md')).toBe('.md');
  });
});

describe('readFile', () => {
  it('Retorna el contenido del archivo markdown y lo muestra en la terminal', () => {
    const fileContent = 'Hola mundo 2 [Node.js](https://nodejs.org/)';
    expect(readFile('prueba2.md')).toBe(fileContent);
  });
});

describe('getLinks', () => {
  it('Retorna un array con un objeto por cada link encontrado, con las propiedades href, text y file', () => {
    const arrayOfLinks = [{
      href: 'https://nodejs.org/',
      text: 'Node.js',
      file: 'prueba2.md',
    }];
    expect(getLinks('prueba2.md')).toStrictEqual(arrayOfLinks);
  });
});

/* const mdLinks = require('../');

describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

}); */
