'use strict';

const QServer = require('@nmq/q/server');
QServer.start();

const databaseEvents = {
  create: 'create',
  read: 'read',
  update: 'update',
  delete: 'delete',
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
