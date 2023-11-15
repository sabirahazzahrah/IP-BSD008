const { User } = require("../models");
const { signToken } = require("../helpers");
const { OAuth2Client } = require("google-auth-library");

class AuthController {
  static async googleLogin(req, res, next) {
    try {
      console.log(req.headers, 8);
      const { token } = req.headers;
      const client = new OAuth2Client();

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      console.log(ticket, "<<<<initicket ");

      const payload = ticket.getPayload();
      console.log(payload, "<<<<<inipayload");
      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          email: payload.email,
          password: "yyyyyy",
        },
        hooks: false,
      });
      console.log(user, "<<<<userniee");
      const access_token = signToken({ id: user.id });
      res.status(200).json(access_token);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = AuthController;
