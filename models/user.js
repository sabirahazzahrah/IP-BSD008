"use strict";
const { Model } = require("sequelize");
const { hashPass } = require("../helpers");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post, { foreignKey: "UserId" });
      User.belongsTo(models.Category, { foreignKey: "CategoryId" });
      // define association here
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "first name cannot be empty",
          },
          notNull: {
            msg: "first name cannot be null",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "last name cannot be empty",
          },
          notNull: {
            msg: "last name cannot be null",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Phone Number cannot be empty",
          },
          notNull: {
            msg: "Phone Number cannot be null",
          },
        },
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Province cannot be empty",
          },
          notNull: {
            msg: "Province cannot be null",
          },
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "City cannot be empty",
          },
          notNull: {
            msg: "City cannot be null",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Email cannot be empty",
          },
          notNull: {
            msg: "Email cannot be null",
          },
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password cannot be empty",
          },
          notNull: {
            msg: "Password cannot be null",
          },
          min: 8,
        },
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "CategoryId cannot be empty",
          },
          notNull: {
            msg: "CategoryId cannot be null",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((pass) => {
    pass.password = hashPass(pass.password);
  });
  return User;
};
