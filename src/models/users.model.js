// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define('users', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dtNascimento: {
      type: DataTypes.DATE,
      allowNull: false
    },
    idade: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    cpfCnpj: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipoUsuario: {
      type: DataTypes.STRING,
      allowNull: false
    },
    authGoogle: {
      type: DataTypes.BOOLEAN,
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
  users.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    users.hasOne(models.artista, {
      as: 'artista',
      foreignKey: 'fk_artista'
    });
    users.hasOne(models.promotor, {
      as: 'promotor',
      foreignKey: 'fk_promotor'
    });
  };

  return users;
};
