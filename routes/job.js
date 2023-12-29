const router = require("express").Router();
const jobController = require("../controllers/jobController");
const { verifyAndAdmin } = require("../middleware/verifyToken");

/**
 * POST /api/job
 * @summary Create Job
 * @tags Jobs
 * @security BearerAuth
 * @return {Job} 200 - success response - application/json
 * @param {Job} request.body.required - Job properties - application/json
 */
router.post("/", verifyAndAdmin, jobController.createJob);

/**
 * PUT /api/job/{id}
 * @summary Update Job
 * @tags Jobs
 * @security BearerAuth
 * @return {Job} - 200 - success response - application/json
 * @param {Job} request.body.required - Job properties - application/json
 * @param {string} id.path.required - Id of the job
 */
router.put("/:id", verifyAndAdmin, jobController.updateJob);

/**
 * DELETE /api/job/{id}
 * @summary Delete Job
 * @tags Jobs
 * @security BearerAuth
 * @return {object} 200 - success response -
 * { "msg": "Successfully deleted" }
 * @param {string} id.path.required - Id of the job
 */
router.delete("/:id", verifyAndAdmin, jobController.deleteJob);

/**
 * GET /api/job/recent
 * @summary Get Recent Jobs
 * @tags Jobs
 * @return {array<Job>} - 200 - success response - application/json
 */
router.get("/recent", jobController.getRecentJob);

/**
 * GET /api/job/hot
 * @summary Get Hot Jobs
 * @tags Jobs
 * @return {array<Job>} - 200 - success response - application/json
 */
router.get("/hot", jobController.getHotJobs);

/**
 * GET /api/job/search/{key}
 * @summary Search for Jobs
 * @tags Jobs
 * @return {array<Job>} - 200 - success response - application/json
 * @param {string} key.path.required - keyword search
 */
router.get("/search/:key", jobController.searchJobs);

/**
 * GET /api/job/{id}
 * @summary Get specific Job
 * @tags Jobs
 * @return {Job} - 200 - success response - application/json
 * @param {string} id.path.required - keyword search
 */
router.get("/:id", jobController.getJob);

/**
 * GET /api/job
 * @summary Get all Jobs
 * @tags Jobs
 * @return {array<Job>} - 200 - success response - application/json
 */
router.get("/", jobController.getAllJobs);

module.exports = router;

/**
 * Job
 * @typedef {object} Job
 * @property {string} title
 * @property {string} description
 * @property {string} location
 * @property {string} company
 * @property {string} salary
 * @property {string} period
 * @property {string} contract
 * @property {array<string>} requirements
 * @property {array<string>} imageUrl
 * @property {User} agentId
 */
