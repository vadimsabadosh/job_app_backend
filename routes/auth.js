const router = require("express").Router();
const authController = require("../controllers/authContoller");
const { verifyToken } = require("../middleware/verifyToken");
// REGISTRATION

/**
 * POST /api/register
 * @summary Registration user
 * @tags Authentication
 * @return {User} 200 - success response - application/json
 * @example response - 200 - success response example
 * [
 *   {
 *     "username": "Barry Light",
 *     "email": "casey.edwards@hhh.cc",
 *     "isAdmin": false,
 *     "skills": ["Devops", "Javascript"],
 *     "profile": "https://example.com/barry-light.png",
 *     "location": "New York, USA"
 *   }
 * ]
 * @param {RegisterUser} request.body.required - User data
 */
router.post("/register", authController.createUser);

// LOGIN
/**
 * POST /api/login
 * @summary Login user
 * @tags Authentication
 * @return {User} 200 - success response - application/json
 * @example response - 200 - success response example
 * [
 *   {
 *     "username": "Barry Light",
 *     "email": "casey.edwards@hhh.cc",
 *     "isAdmin": false,
 *     "skills": ["Devops", "Javascript"],
 *     "profile": "https://example.com/barry-light.png",
 *     "location": "New York, USA"
 *   }
 * ]
 * @param {LoginUser} request.body.required - User data
 */
router.post("/login", authController.loginUser);

/**
 * POST /api/logout
 * @summary Logout user
 * @tags Authentication
 * @return {object} 200 - success response - application/json
 * @example response - 200 - success response example
 *   {
 *     "ok": true,
 *   }
 */
router.post("/logout", verifyToken, authController.logoutUser);

module.exports = router;

/**
 * User
 * @typedef {object} User
 * @property {string} username
 * @property {string} email
 * @property {boolean} isAdmin
 * @property {array<string>} skills
 * @property {string} profile
 * @property {string} location
 */
/**
 * Register User dto
 * @typedef {object} RegisterUser
 * @property {string} username
 * @property {string} email
 * @property {string} password
 */
/**
 * Login User dto
 * @typedef {object} LoginUser
 * @property {string} email
 * @property {string} password
 */
