const Bookmark = require("../models/Bookmark");

module.exports = {
	createBookmark: async (req, res) => {
		try {
			const bookmark = new Bookmark(req.body);
			await bookmark.save();
			return res.status(201).json(bookmark);
		} catch (e) {
			res.status(500).json({ msg: e.toString() });
		}
	},
	deleteBookmark: async (req, res) => {
		try {
			await Bookmark.findByIdAndDelete(req.params.id);
			return res.status(200).json({ msg: "Successfully deleted" });
		} catch (e) {
			res.status(500).json({ msg: e.toString() });
		}
	},
	getBookmarks: async (req, res) => {
		try {
			const userId = req.params.userId;
			const bookmarks = await Bookmark.find({ userId });
			return res.status(200).json(bookmarks);
		} catch (e) {
			res.status(500).json({ msg: e.toString() });
		}
	},
};
