const users = require('./users/users.service.js');
const promotor = require('./promotor/promotor.service.js');
const artista = require('./artista/artista.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(promotor);
  app.configure(artista);
};
