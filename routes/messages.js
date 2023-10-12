const router = require("express").Router();
const messageController = require("../controllers/messageController");
const { verifyToken } = require("../middleware/verifyToken");

// CREATE MESSAGES
router.post("/", verifyToken, messageController.sendMessage);

//// GET ALL MESSAGES
router.get("/:id", verifyToken, messageController.getMessages);

module.exports = router;
