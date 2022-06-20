const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_CONNECTION);

sequelize.sync().catch(console.log);

module.exports = sequelize;
