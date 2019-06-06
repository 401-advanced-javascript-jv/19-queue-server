'use strict';

require('dotenv').config();
const fs = require('fs').promises;

const pReadFile = (file) => {
  return fs.readFile(file);
};

const bModifyContents = (data) => {
  let text = data.toString();
  let upperText = text.toUpperCase();
  return Buffer.from(upperText);
};

const pWriteFile = (filename, buffer) => {
  return fs.writeFile(filename, buffer);
};

const alterFile = (file) => {
  pReadFile(file)
    .then((data) => {
      return pWriteFile(bModifyContents(data));
    })
    .then(() => {
      console.log(`${file} written to disk`);
    })
    .catch((error) => {
      throw error;
    });
};

let file = process.argv.slice(2).shift();
alterFile(file);
