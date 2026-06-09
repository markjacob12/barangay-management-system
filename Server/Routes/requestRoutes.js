const express = require("express");
const router = express.Router();

// 1. Tama ang pag-import gamit ang destructuring {}
const { protect } = require("../middleware/authMiddleware");
const { createRequest } = require("../Controller/requestController");
const { getRequest } = require("../Controller/requestController");
const { deleteRequest } = require("../Controller/requestController");
const { updateRequestStatus } = require("../Controller/requestController");
const { searchRequest } = require("../Controller/requestController");

// 2. DAPAT MAGKAHIWALAY SILA NG COMMA.
// Ang 'protect' ay middleware, ang 'createRequest' ay ang handler.
router.post("/apply", protect, createRequest);
router.get("/", protect, getRequest);
router.delete("/:id", protect, deleteRequest);
router.put("/:id/status", protect, updateRequestStatus);

module.exports = router;
