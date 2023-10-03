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

router.put("/:id", verifyAndAuthorization, userContoller.updateUser);
router.delete("/:id", verifyAndAuthorization, userContoller.deleteUser);
router.get("/:id", verifyToken, userContoller.getUser);
router.get("/me", verifyToken, userContoller.getMe);
router.get("/", verifyToken, userContoller.getAllUsers);
router.post(
	"/upload_photo",
	verifyToken,
	upload.single("file"),
	userContoller.uploadPhoto
);
module.exports = router;
