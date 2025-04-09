const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
	createLink,
	getUserLinks,
	getStats,
} = require("../controllers/linkController");

router.post("/", auth, createLink);
router.get("/", auth, getUserLinks);
router.get("/stats/:code", auth, getStats);

module.exports = router;
