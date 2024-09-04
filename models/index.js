// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
// const config = require('../config/db.config.js');

// const db = {};

// // Initialize Sequelize
// const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
//   host: config.HOST,
//   dialect: config.dialect,
//   operatorsAliases: 0,
//   pool: {
//     max: config.pool.max,
//     min: config.pool.min,
//     acquire: config.pool.acquire,
//     idle: config.pool.idle
//   }
// });

// // Dynamically import all models
// fs.readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// // Set up model associations if any
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// // Export Sequelize and models
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
const Sequelize = require('sequelize');
const config = require('../config/db.config.js');

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
});

const User = require('./user.model.js')(sequelize, Sequelize.DataTypes);

const Income = require('./income.model.js')(sequelize, Sequelize.DataTypes);

const Expense = require('./expense.model.js')(sequelize, Sequelize.DataTypes);



const db = {
  User,
  Income,
  Expense,

  sequelize,
  Sequelize,
};

module.exports = db;
