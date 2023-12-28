const router = require("express").Router();
const bookmarkController = require("../controllers/bookmarkController");
const {
	verifyToken,
	verifyAndAuthorization,
} = require("../middleware/verifyToken");

// CREATE BOOKMARKS
/**
 * POST /api/bookmark
 * @summary Create bookmarks
 * @tags Bookmarks
 * @security BearerAuth
 * @return {Bookmark} 200 - success response - application/json
 * @param {CreateBookmark} request.body.required - Bookmark properties - application/json
 */
router.post("/", verifyToken, bookmarkController.createBookmark);

//// DELETE BOOKMARKS
/**
 * DELETE /api/bookmark/{id}
 * @summary Delete specific bookmark
 * @tags Bookmarks
 * @security BearerAuth
 * @param {string} id.path.required - bookmark id
 * @return {object} 200 - success response - application/json
 * @example response - 200 - success response
 * { "msg": "Successfully deleted" }
 */
router.delete("/:id", verifyToken, bookmarkController.deleteBookmark);

//// GET BOOKMARKS
/**
 * GET /api/bookmark
 * @summary Get all bookmarks
 * @tags Bookmarks
 * @security BearerAuth
 * @return {array<Bookmark>} 200 - success response - application/json
 */
router.get("/", verifyToken, bookmarkController.getBookmarks);

module.exports = router;

/**
 * Create Bookmark dto
 * @typedef {object} CreateBookmark
 * @property {string} job
 */

/**
 * Bookmark
 * @typedef {object} Bookmark
 * @property {Job} job
 * @property {string} userId
 */
