const router = require("express").Router();
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, password, confirmPassword } = req.body;

    //validations
    if (!name || !email || !phone || !password || !confirmPassword)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all the required fields!!!" });

    if (password.length < 6)
      return res.status(400).json({
        errorMessage: "Please enter a password of atleast 6 characters",
      });

    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ errorMessage: "Please enter the same password twice" });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        errorMessage: "An account with this email already exists",
      });
    }

    // hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save a new user account to DB
    const newUser = new User({
      name,
      email,
      phone,
      passwordHash,
    });
    const SavedUser = await newUser.save();

    // sign in token
    const token = jwt.sign(
      {
        user: SavedUser._id,
      },
      process.env.JWT_SECRET
    );

    //send the token in a HTTP-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    res.status(500).send();
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //   validate
    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all the required fields!!" });

    const existingUSer = await User.findOne({ email });

    if (!existingUSer)
      return res.status(401).json({ errorMessage: "Wrong email or password" });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUSer.passwordHash
    );
    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong email or password" });

    // sign in token
    const token = jwt.sign(
      {
        user: existingUSer._id,
      },
      process.env.JWT_SECRET
    );

    //send the token in a HTTP-only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    res.status(500).send();
  }
});

// logout
router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});

router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;
    // if not token false , you are not logged in
    if (!token) return res.status(401).json(false);

    //   if unvarified token
    jwt.verify(token, process.env.JWT_SECRET);

    // else true
    res.send(true);
    next();
  } catch (err) {
    res.json(false);
  }
});

module.exports = router;
