#!/usr/bin/env node

const {
  routeExists, routeAbsolute, mdFileExtension, isADirectory, readFile, getLinks, validateUrlStatus, findFilesInDir,
} = require('./main');

const {
mdLinks
} = require('./mdLinks');

let enteredPath = process.argv[2];
const options = process.argv;

console.log(options);
