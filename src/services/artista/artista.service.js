// Initializes the `artista` service on path `/artista`
const { Artista } = require('./artista.class');
const hooks = require('./artista.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/artista', new Artista(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('artista');

  service.hooks(hooks);
};
