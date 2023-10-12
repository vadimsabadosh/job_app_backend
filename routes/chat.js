const router = require("express").Router();
const chatController = require("../controllers/chatController");
const { verifyToken } = require("../middleware/verifyToken");

// CREATE Chat
router.post("/", verifyToken, chatController.accessChat);

//// GET Chat
router.get("/", verifyToken, chatController.getChat);

module.exports = router;
