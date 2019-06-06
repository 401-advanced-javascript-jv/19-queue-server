'use strict';

require('dotenv').config();

const constants = require('../util/constants.js');
const events = require('../util/events.js');

const PORT = process.env.PORT || constants.PORT;
const HOST = process.env.HOST || constants.SERVER_URL;
const HOST_URL = `${HOST}:${PORT}`;

const socketIOClient = require('socket.io-client');
const socket = socketIOClient(HOST_URL);

socket.on('connect', () => {
  console.log('Socket connected');
});

const {readFile, modifyContents, writeFile} = require('./alter.js');

const alterFile = (file) => {
  return readFile(file)
    .then((data) => {
      return writeFile(file, modifyContents(data));
    })
    .then(() => {
      return Promise.resolve();
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const file = process.argv[2];
alterFile(file)
  .then(() => {
    socket.emit(events.SAVE_EVENT, `${file} ${constants.SUCCESS}`);
    socket.close();
  })
  .catch((error) => {
    socket.emit(events.ERROR_EVENT, 'error!' + error);
  });

module.exports = exports = { readFile, modifyContents, writeFile };
