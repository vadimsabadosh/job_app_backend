const router = require("express").Router();
const chatController = require("../controllers/chatController");
const { verifyToken } = require("../middleware/verifyToken");

// CREATE Chat
/**
 * POST /api/chat
 * @summary Create chat
 * @tags Chat
 * @security BearerAuth
 * @return {Chat} 200 - success response - application/json
 * @param {CreateChat} request.body.required - Id of the reciever user - application/json
 */
router.post("/", verifyToken, chatController.accessChat);

//// GET Chat
/**
 * GET /api/chat
 * @summary Get list of chats
 * @tags Chat
 * @security BearerAuth
 * @return {array<Chat>} 200 - success response - application/json
 */
router.get("/", verifyToken, chatController.getChat);

module.exports = router;

/**
 * Chat
 * @typedef {object} Chat
 * @property {string} chatName
 * @property {boolean} isGroup
 * @property {array<User>} users
 * @property {Message} latestMessage
 * @property {User} groupAdmin
 */
/**
 * CreateChat
 * @typedef {object} CreateChat
 * @property {string} userId
 */
