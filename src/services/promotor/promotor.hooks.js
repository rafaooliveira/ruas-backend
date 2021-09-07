const gerarUser = require('../../hooks/gerarUser.js');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      gerarUser()
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
