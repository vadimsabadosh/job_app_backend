const router = require("express").Router();
const bookmarkController = require("../controllers/bookmarkController");
const {
	verifyToken,
	verifyAndAuthorization,
} = require("../middleware/verifyToken");

// CREATE BOOKMARKS
router.post("/", verifyToken, bookmarkController.createBookmark);

//// DELETE BOOKMARKS

router.delete("/:id", verifyToken, bookmarkController.deleteBookmark);

//// GET BOOKMARKS
router.get("/", verifyToken, bookmarkController.getBookmarks);

module.exports = router;
