const {
  routeExists, routeAbsolute, mdFileExtension, readFile,
} = require('../src/main');

describe('routeExists', () => {
  it('Valida que la ruta proporcionada exista', () => {
    expect(routeExists('prueba.md')).toBe(true);
  });
});

describe('routeAbsolute', () => {
  it('Si la ruta existe, debe retornar la ruta absoluta del archivo, si la ruta es relativa la convierte a absoluta', () => {
    const pathAbsolute = 'D:\\Casa\\Google Drive\\Daniela Andrade\\LABORATORIA\\LIM018-md-links\\prueba.md';
    expect(pathAbsolute).toBe(pathAbsolute);
    expect(routeAbsolute('prueba.md')).toBe(pathAbsolute);
  });
});

describe('mdFileExtension', () => {
  it('Si el archivo es tipo markdown, debe retornar .md', () => {
    expect(mdFileExtension('prueba.md')).toBe('.md');
  });
});

describe('', () => {
  it('Retorna el contenido del archivo markdown y lo muestra en la terminal', () => {
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
