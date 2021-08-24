const Sequelize = require('sequelize');
const logger = require('./logger');
module.exports = function (app) {
  const connectionString = app.get('sqlite');
  const sequelize = new Sequelize(connectionString, {
    dialect: 'sqlite',
    logging: false,
    define: {
      freezeTableName: true
    }
  });
  
  try {
	sequelize.authenticate();
	logger.info("Loguei");
  } catch (e) {
	logger.info("Erro", e)
  }
  
  const oldSetup = app.setup;

  app.set('sequelizeClient', sequelize);

  app.setup = function (...args) {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach(name => {
      if ('associate' in models[name]) {
        models[name].associate(models);
      }
    });

    // Sync to the database
    app.set('sequelizeSync', sequelize.sync());

	logger.info('[DB Backend] Connected')

    return result;
  };
};
