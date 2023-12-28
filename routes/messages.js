const router = require("express").Router();
const messageController = require("../controllers/messageController");
const { verifyToken } = require("../middleware/verifyToken");

// CREATE MESSAGES
/**
 * POST /api/messages
 * @summary Send message
 * @tags Messages
 * @security BearerAuth
 * @return {Message} 200 - success response - application/json
 * @param {SendMessage} request.body.required - Message properties - application/json
 */
router.post("/", verifyToken, messageController.sendMessage);

//// GET ALL MESSAGES
/**
 * Get /api/messages/{id}
 * @summary Get messages
 * @tags Messages
 * @security BearerAuth
 * @return {array<Message>} 200 - success response - application/json
 * @param {string} pageSize.query.required - quantity of messages on page
 * @param {string} page.query.required - number of page
 * @param {string} id.path.required - id of the chat
 */
router.get("/:id", verifyToken, messageController.getMessages);

module.exports = router;

/**
 * Message
 * @typedef {object} Message
 * @property {string} content
 * @property {User} sender
 * @property {User} receiver
 * @property {Chat} chat
 * @property {array<User>} readBy
 */
/**
 * Send Message
 * @typedef {object} SendMessage
 * @property {string} content
 * @property {string} chatId
 * @property {string} receiver
 */
