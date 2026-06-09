const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const protect = async (req, res, next) => {
  let token;

  // 1. I-check kung may token sa headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 2. Kunin ang token (tatanggalin yung salitang "Bearer")
      token = req.headers.authorization.split(" ")[1];

      // 3. I-verify ang token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Hanapin ang user at i-attach sa request object (req.user)
      req.user = await User.findById(decoded.id).select("-password");

      next(); // Tuloy na sa controller
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
