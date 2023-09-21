const router = require("express").Router();
const userContoller = require("../controllers/userController");
const {
	verifyAndAuthorization,
	verifyToken,
	verifyAndAdmin,
} = require("../middleware/verifyToken");

router.put("/:id", verifyAndAuthorization, userContoller.updateUser);
router.delete("/:id", verifyAndAuthorization, userContoller.deleteUser);
router.get("/:id", verifyToken, userContoller.getUser);
router.get("/", verifyToken, userContoller.getAllUsers);

module.exports = router;
