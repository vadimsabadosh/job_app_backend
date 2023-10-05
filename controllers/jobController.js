const Job = require("../models/Job");

module.exports = {
	createJob: async (req, res) => {
		try {
			const newJob = new Job(req.body);
			await newJob.save();
			return res.status(201).json(newJob);
		} catch (e) {
			return res.status(500).json(e);
		}
	},
	updateJob: async (req, res) => {
		try {
			const { id } = req.params;
			const UpdateJob = await Job.findByIdAndUpdate(id, req.body);
			return res.status(200).json(UpdateJob);
		} catch (e) {
			return res.status(500).json(e);
		}
	},
	deleteJob: async (req, res) => {
		try {
			await Job.findByIdAndDelete(req.params.id);

			res.status(200).json({ msg: "Successfully deleted" });
		} catch (e) {
			res.status(500).json({ msg: e.toString() });
		}
	},
	getJob: async (req, res) => {
		try {
			const JobModel = await Job.findById(req.params.id);
			if (!JobModel) {
				return res.status(404).json({ msg: "Job not found" });
			}
			return res.status(200).json(JobModel);
		} catch (e) {
			return res.status(500).json({ msg: e.toString() });
		}
	},
	getAllJobs: async (req, res) => {
		try {
			const JobsModel = await Job.find();
			return res.status(200).json(JobsModel);
		} catch (e) {
			return res.status(500).json({ msg: e.toString() });
		}
	},
	getRecentJob: async (req, res) => {
		try {
			const JobModel = await Job.findOne().sort("-created_at");
			return res.status(200).json(JobModel);
		} catch (e) {
			return res.status(500).json({ msg: e.toString() });
		}
	},
	searchJobs: async (req, res) => {
		try {
			const results = await Job.aggregate([
				{
					$search: {
						index: "jobSearch",
						text: {
							query: req.params.key,
							path: {
								wildcard: "*",
							},
						},
					},
				},
			]);

			return res.status(200).json(results);
		} catch (e) {
			return res.status(500).json({ msg: e.toString() });
		}
	},
};
