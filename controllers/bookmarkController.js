const Bookmark = require("../models/Bookmark");
const mongoose = require("mongoose");
const Job = require("../models/Job");

module.exports = {
	createBookmark: async (req, res) => {
		try {
			const jobId = req.body.job;

			const result = await Bookmark.find({ userId: req.user.id }).populate(
				"job"
			);
			const isExist = result.find((bkmrk) =>
				bkmrk.job._id.equals(new mongoose.Types.ObjectId(jobId))
			);
			if (isExist) {
				return res.status(401).json({ msg: "Bookmark is already in list" });
			}
			const job = await Job.findById(jobId);
			if (!job) {
				return res.status(404).json({ msg: "Job not found" });
			}
			const bookmark = new Bookmark({ job: job, userId: req.user.id });
			await bookmark.save();
			return res.status(201).json(bookmark);
		} catch (e) {
			res.status(500).json({ msg: e.toString() });
		}
	},
	deleteBookmark: async (req, res) => {
		try {
			const userId = req.user.id;
			const jobId = req.params.id;
			await Bookmark.findOneAndDelete({
				userId,
				jobId,
			});
			return res.status(200).json({ msg: "Successfully deleted" });
		} catch (e) {
			res.status(500).json({ msg: e.toString() });
		}
	},
	getBookmarks: async (req, res) => {
		try {
			const userId = req.user.id;
			const bookmarks = await Bookmark.find({ userId }).populate("job");
			return res.status(200).json(bookmarks);
		} catch (e) {
			res.status(500).json({ msg: e.toString() });
		}
	},
};
