const { models } = require("../models");
const { User, QRCode, ConnectedDevice } = models;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
exports.register = async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { name, email, password } = req.body;
    // console.log(req.body);
    // Validate user input
    // res.header( "Access-Control-Allow-Origin" );
    if (!(email && password && name)) {
      return res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).json("User Already Exist. Please Login");
    }

    // Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email, name },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    // generate QRCode
    const getUserId = User.find().sort({ _id: 1 });
    await QRCode.create({ userId: getUserId.userId });

    // return new user
    res.status(201).json({ token });
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
};

// Login
exports.login = async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { userId: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      return res.status(200).json({ token });
    }
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our login logic ends here
};
