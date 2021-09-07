// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const promotor = sequelizeClient.define('promotor', {
		
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    agencia: {
      type: DataTypes.STRING,
      allowNull: false
    }
  
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  promotor.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    promotor.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'id_usuario'
    });
  };

  return promotor;
};
