const express = require("express");
const router = express.Router();

// I-import ang controller (siguraduhin ang tamang path)
const authController = require("../Controller/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
