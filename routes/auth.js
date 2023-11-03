const router = require("express").Router();
const authController = require("../controllers/authContoller");
const { verifyToken } = require("../middleware/verifyToken");
// REGISTRATION

router.post("/register", authController.createUser);

// LOGIN
router.post("/login", authController.loginUser);
router.post("/logout", verifyToken, authController.logoutUser);

module.exports = router;
