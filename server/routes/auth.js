const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);
const { User } = require("../models/user");
const privileged = require("../specialUsers");
const { addProfile } = require("../views/profile");

router.post(
  "/add",
  async (req, res, next) => {
    try {
      const { token } = req.body;
      await client.verifyIdToken({
        idToken: token,
        requiredAudience: process.env.AUDIENCE,
      });

      next();
    } catch (err) {
      return res.status(401).json({
        msg: "invalid attempt",
        error: err.message,
      });
    }
  },
  addProfile
);

router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      requiredAudience: process.env.AUDIENCE,
    });

    const payload = ticket.getPayload();
    const email = payload.email;

    if (
      !privileged.includes(email) && (email[10] != "p" ||
      (email.substring(0, 5) != "h2024" && email.substring(0, 5) != "f2021" && email.substring(0, 5) != "f2022" && email.substring(0, 5) != "f2023" && email.substring(0, 5) != "f2024"))
    ) {
      //checking if a user is eligible to login, some special users are also mentioned in specialUsers.js file
      return res.send({
        authorised: 0,
      });
    }
    console.log("The email is: ", email);
    const user = await User.findOne({where: {email: payload.email}});

    if (!user) {
      return res.send({
        authorised: 1,
        user: {},
        exists: false,
      });
    }

    console.log("This is from auth, the user exists and the data is: ", user);

    const jwt_token = jwt.sign(
      {
        id: user.userID,
        bitsId: user.bitsId,
        branchCode: user.branchCode,
        email: payload.email,
        senior: user.senior
      },
      process.env.TOKEN_KEY,
      { expiresIn: "180d" }
    );
    return res.send({
      authorised: 1,
      user: user.userID,
      token: jwt_token,
      exists: true,
    });
  } catch (error) {
    return res.status(400).send({
      authorised: 0,
      msg: "invalid token",
      error: error.message,
    });
  }
});

module.exports = router;
