const { User } = require("../models");
const { signToken } = require("../helpers");
const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");

class AuthController {
  static async googleLogin(req, res, next) {
    try {
      const { token } = req.headers;
      const client = new OAuth2Client();

      // Verifikasi token
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      console.log(payload, 18);

      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          firstName: payload.given_name,
          lastName: payload.family_name,
          phoneNumber: "defaults",
          province: "defaults",
          city: "defaults",
          email: payload.email,
          password: "defaults",
          CategoryId: 1,
        },
        hooks: false,
      });
      const access_token = signToken({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
      });
      console.log(access_token);
      res.status(201).json(access_token);
    } catch (error) {
      console.error(error);

      // Tangani kesalahan dengan memberikan respons yang sesuai
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async githubLogin(req, res, next) {
    try {
      console.log(req.query, "<<<<<<");
      const { code } = req.query;
      const clientId = process.env.GITHUB_CLIENT_ID;
      const clientSecret = process.env.GITHUB_CLIENT_SECRET;

      const params = `?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`;
      const tokenResponse = await axios.post(
        "https://github.com/login/oauth/access_token" + params,
        null,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      console.log(tokenResponse, 70);
      res.status(200).json({ msg: "ini" });
    } catch (error) {
      console.log(error, 74);
    }
  }
}

module.exports = AuthController;
