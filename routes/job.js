const router = require("express").Router();
const jobController = require("../controllers/jobController");
const { verifyAndAdmin } = require("../middleware/verifyToken");
const Job = require("../models/Job.js");

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
 * GET /api/job/{slug}
 * @summary Get specific Job
 * @tags Jobs
 * @return {Job} - 200 - success response - application/json
 * @param {string} slug.path.required - keyword search
 */
router.get("/slug/:slug", jobController.getJobBySlug);

/**
 * GET /api/job
 * @summary Get all Jobs
 * @tags Jobs
 * @return {array<Job>} - 200 - success response - application/json
 */
router.get("/", jobController.getAllJobs);
//router.post("/add_short_descr", async (req, res) => {
//	try {
//		const jobs = await Job.find();

//		for (let i = 0; i < jobs.length; i++) {
//			const job = jobs[i];
//			let short_description = job.description.substring(0, 100) + "...";
//			await Job.updateOne(
//				{ _id: job._id },
//				{ $set: { short_description: short_description } }
//			);
//			console.log("router.post  ff:", ff);
//			return res.send("saved");
//		}
//	} catch (error) {}
//});

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

module.exports = router;
