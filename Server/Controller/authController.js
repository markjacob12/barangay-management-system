const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

exports.register = async (req, res) => {
  try {
    const { username, email, password, firstName, middleName, lastName, role } =
      req.body;

    const exisitingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (exisitingUser)
      return res.status(400).json({ message: "User alredy exist" });

    // 2. Create new user instance
    const newUser = new User({
      username,
      email,
      password,
      firstName,
      lastName,
      middleName,
      role: "user",
    });

    // 3. I-save sa Database
    await newUser.save();

    // 4. Mag-generate ng token (kung gusto mo auto-login pagka-register)
    const token = newUser.generateToken();

    res.status(201).json({
      message: "User registered successfully",
      token: token,
      user: {
        username: newUser.username,
        role: newUser.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Hanapin ang user base sa email
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    // 2. I-compare ang password (yung input vs yung hashed password sa DB)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }
    // 3. Kung tama lahat, gawa tayo ng token
    const token = user.generateToken();

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        lastName: user.lastName,
        firstName: user.firstName,
        middleName: user.middleName,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
