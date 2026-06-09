const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  getResident,
  addResident,
  deleteResident,
  searchResident,
} = require("../Controller/residentController");

router.post("/add", protect, addResident);
router.get("/", protect, getResident);
router.delete("/:id", protect, deleteResident);

module.exports = router;
