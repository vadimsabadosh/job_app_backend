const router = require("express").Router();
const userContoller = require("../controllers/userController");
const Multer = require("multer");
const {
	verifyAndAuthorization,
	verifyToken,
	verifyAndAdmin,
} = require("../middleware/verifyToken");
const storage = new Multer.memoryStorage();
const upload = Multer({
	storage: storage,
});
/**
 * PUT /api/user/{id}
 * @summary Update User
 * @tags User
 * @security BearerAuth
 * @return {User} 200 - success response - application/json
 * @param {User} request.body.required - Bookmark properties - application/json
 * @param {string} id.path.required - Bookmark properties - application/json
 */
router.put("/:id", verifyAndAuthorization, userContoller.updateUser);

/**
 * DELETE /api/user/{id}
 * @summary Delete User
 * @tags User
 * @security BearerAuth
 * @return {object} - 200 - success response - { "msg": "Successfully deleted" }
 * @param {User} request.body.required - Bookmark properties - application/json
 * @param {string} id.path.required - Bookmark properties - application/json
 */
router.delete("/:id", verifyAndAuthorization, userContoller.deleteUser);

/**
 * GET /api/user/me
 * @summary Get my info
 * @tags User
 * @security BearerAuth
 * @return {User} - 200 - success response - application/json
 */
router.get("/me", verifyToken, userContoller.getMe);

/**
 * GET /api/user/{id}
 * @summary Get specific User
 * @tags User
 * @security BearerAuth
 * @return {User} - 200 - success response - application/json
 * @param {string} id.path.required - Bookmark properties - application/json
 */
router.get("/:id", verifyToken, userContoller.getUser);

/**
 * GET /api/user
 * @summary Get all Users
 * @tags User
 * @security BearerAuth
 * @return {array<User>} - 200 - success response - application/json
 */
router.get("/", verifyToken, userContoller.getAllUsers);

/**
 * POST /api/user/upload_photo
 * @summary Upload image avatar
 * @tags User
 * @security BearerAuth
 * @param {UploadPhoto} request.body.required - user avatar - multipart/form-data
 * @return {User} - 200 - success response - application/json
 */
router.post(
	"/upload_photo",
	verifyToken,
	upload.single("file"),
	userContoller.uploadPhoto
);
module.exports = router;

/**
 * Upload a photo
 * @typedef {object} UploadPhoto
 * @property {string} file - image cover - binary
 */
