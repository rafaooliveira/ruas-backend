// Initializes the `promotor` service on path `/promotor`
const { Promotor } = require('./promotor.class');
const createModel = require('../../models/promotor.model');
const hooks = require('./promotor.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/promotor', new Promotor(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('promotor');

  service.hooks(hooks);
};
