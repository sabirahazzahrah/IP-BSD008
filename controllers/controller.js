const { compareHash, signToken } = require("../helpers");
const { User, Category, Post } = require("../models");

class Controller {
  static async register(req, res, next) {
    try {
      const {
        firstName,
        lastName,
        phoneNumber,
        province,
        city,
        email,
        password,
        CategoryId,
      } = req.body;

      let data = await User.create({
        firstName,
        lastName,
        phoneNumber,
        province,
        city,
        email,
        password,
        CategoryId,
      });
      res.status(201).json({ msg: "berhasil register" });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new Error("Please input email/password");
      }

      let data = await User.findOne({
        where: {
          email,
        },
      });
      console.log(data);

      const isValid = compareHash(password, data.password);

      if (!isValid) {
        throw new Error("Invalid email/password");
      }

      const payload = {
        id: data.id,
        firstName: data.firstName,
        email: data.email,
        CategoryId: data.CategoryId,
      };
      const token = signToken(payload);

      res.status(200).json({ access_token: token });
    } catch (error) {
      next(error);
    }
  }

  static async getUser(req, res, next) {
    try {
      let data = await User.findAll({
        include: {
          model: Category,
        },
      });
      console.log(data);
      res.status(200).json({
        msg: "dah kebaca ni",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const {
        firstName,
        lastName,
        phoneNumber,
        province,
        city,
        email,
        password,
        CategoryId,
      } = req.body;

      let data = await User.update(
        {
          firstName,
          lastName,
          phoneNumber,
          province,
          city,
          email,
          password,
          CategoryId,
        },
        {
          where: {
            id,
          },
        }
      );

      let output = await User.findByPk(id);
      console.log(output, 117);
      res.status(200).json({
        msg: `dah di update`,
        data,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
