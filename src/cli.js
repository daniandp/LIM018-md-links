#!/usr/bin/env node
const process = require('node:process');
const {
  mdLinks
} = require('./mdLinks');

const path = process.argv[2];
const options = process.argv;

console.log(options);
