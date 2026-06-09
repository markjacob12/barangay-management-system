const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { addConcern } = require("../Controller/concernController");
const { getConcern } = require("../Controller/concernController");
const { updateConcernStatus } = require("../Controller/concernController");
const { resolveConern } = require("../Controller/concernController");

const upload = require("../middleware/uploadMiddleware");

router.post("/add", protect, upload.single("image"), addConcern);
router.get("/", protect, getConcern);
router.put("/:id/status", protect, updateConcernStatus);
router.put("/resolve/:id", protect, upload.single("afterImage"), resolveConern);

module.exports = router;
