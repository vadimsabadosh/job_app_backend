const router = require("express").Router();
const jobController = require("../controllers/jobController");
const { verifyAndAdmin } = require("../middleware/verifyToken");

router.post("/", verifyAndAdmin, jobController.createJob);
router.put("/:id", verifyAndAdmin, jobController.updateJob);
router.delete("/:id", verifyAndAdmin, jobController.deleteJob);
router.get("/:id", jobController.getJob);
router.get("/", jobController.getAllJobs);
router.get("/search/:key", jobController.searchJobs);

module.exports = router;
