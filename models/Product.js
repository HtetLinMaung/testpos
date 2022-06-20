const Sequelize = require("sequelize");
const { Model } = require("sequelize");
const sequelize = require("../database");

class Product extends Model {}

Product.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL,
      defaultValue: 0.0,
    },
    description: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    image: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
  },
  {
    sequelize,
    modelName: "product",
    tableName: "products",
  }
);

module.exports = Product;
