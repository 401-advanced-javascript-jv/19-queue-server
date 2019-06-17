'use strict';

require('dotenv').config();
const QServer = require('@nmq/q/server');
QServer.start();

const databaseEvents = {
  post: 'post',
  get: 'get',
  put: 'put',
  delete: 'delete',
  patch: 'patch',
  error: 'error',
};

const fileEvents = {
  save: 'save',
  error: 'error',
};

const database = new QServer('database');
for(let event of Object.keys(databaseEvents)) {
  database.monitorEvent(databaseEvents[event]);
}

const file = new QServer('file');
for (let event of Object.keys(fileEvents)) {
  file.monitorEvent(fileEvents[event]);
}
