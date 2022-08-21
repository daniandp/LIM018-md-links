const {
  routeExists, routeAbsolute, mdFileExtension, readFile,
} = require('../src/main');

describe('routeExists', () => {
  it('Valida que la ruta proporcionada exista', () => {
    expect(routeExists('prueba.md')).toBe(true);
  });
});

describe('routeAbsolute', () => {
  it('Valida que la ruta proporcionada sea absoluta y si no lo es la convierte a absoluta', () => {
    const pathAbsolute = 'D:\\Casa\\Google Drive\\Daniela Andrade\\LABORATORIA\\LIM018-md-links\\prueba.md';
    expect(pathAbsolute).toBe(pathAbsolute);
    expect(routeAbsolute('prueba.md')).toBe(pathAbsolute);
  });
});

describe('mdFileExtension', () => {
  it('Valida que la extensión del archivo sea .md', () => {
    expect(mdFileExtension('prueba.md')).toBe('.md');
  });
});

describe('', () => {
  it('Lee el contenido del archivo markdown y lo muestra en la terminal', () => {
    const file = 'Archivo de prueba para el test';
    expect(readFile('pruebaTest.md')).toBe(file);
  });
});

/* const mdLinks = require('../');

describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

}); */
