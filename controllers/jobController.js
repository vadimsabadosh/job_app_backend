const Job = require("../models/Job");
const ObjectID = require("mongodb").ObjectID;
const slugify = require("slugify");

module.exports = {
	createJob: async (req, res) => {
		try {
			let objectId = new ObjectID();
			const data = {
				...req.body,
				_id: objectId,
				slug: slugify(`${req.body.title}-${objectId}`, {
					lower: true,
					strict: true,
					locale: "en",
					trim: true,
					remove: /[*+~.,()'"!:@\/]/g,
				}),
			};
			const newJob = new Job(data);
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
	getJobBySlug: async (req, res) => {
		try {
			const JobModel = await Job.findOne({ slug: req.params.slug });
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
			const pageSize = Number(req.query.pageSize) || 12;
			const page = Number(req.query.page) || 1;
			const skipMessages = page * pageSize - pageSize;
			const skip = page === 1 ? 0 : skipMessages;
			const count = await Job.find().count();
			const JobsModel = await Job.find()
				.sort({ createdAt: -1 })
				.skip(skip)
				.limit(pageSize);

			return res.status(200).json({ data: JobsModel, count });
		} catch (e) {
			return res.status(500).json({ msg: e.toString() });
		}
	},
	getRecentJob: async (req, res) => {
		try {
			const JobModel = await Job.find().sort("-created_at").limit(4);
			return res.status(200).json(JobModel);
		} catch (e) {
			return res.status(500).json({ msg: e.toString() });
		}
	},
	getHotJobs: async (req, res) => {
		try {
			const JobModel = await Job.find().limit(4);
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
