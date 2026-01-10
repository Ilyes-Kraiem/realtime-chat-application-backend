const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { sendMessage, allMessages } = require("../controllers/messageControllers");
router.get("/:chatId", protect, allMessages);
router.post("/", protect, sendMessage);
module.exports = router;
