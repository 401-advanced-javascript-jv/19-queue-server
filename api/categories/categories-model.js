'use strict';

/**
 * Categories model, uses memory-model for backend.
 * @module src/models/categories/categories-model
 * @requires ../memory-model.js
 */
const Model = require('../memory-model.js');

const schema = {
  _id: {required:true},
  name: {required:true},
};

class Categories extends Model {}

module.exports = new Categories(schema);
