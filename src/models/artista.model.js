// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const artista = sequelizeClient.define('artista', {
		userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    vulgo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avaliacao: {
      type: DataTypes.INTEGER,
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
  artista.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
		artista.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'id_usuario',
			allowNull: false
    });
  };

  return artista;
};
