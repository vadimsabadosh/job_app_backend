const User = require("../models/User");
const Chat = require("../models/Chat");

module.exports = {
	accessChat: async (req, res) => {
		try {
			const { userId } = req.body;

			if (!userId) {
				res.status(400).json({ msg: "Invalid user id" });
			}

			let isChat = await Chat.find({
				isGroup: false,
				$and: [
					{ users: { $elemMatch: { $eq: req.user.id } } },
					{ users: { $elemMatch: { $eq: userId } } },
				],
			})
				.populate("users", "-password")
				.populate("latestMessage");

			isChat = await User.populate(isChat, {
				path: "latestMessage.sender",
				select: "username profile email",
			});

			if (isChat.length > 0) {
				res.send(isChat[0]);
			} else {
				var chatData = {
					chatName: req.user.id,
					isGroup: false,
					users: [req.user.id, userId],
				};

				const createdChat = await Chat.create(chatData);

				const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
					"users",
					"-password"
				);

				res.status(200).json(fullChat);
			}
		} catch (e) {
			res.status(400).json({ msg: `Failed to create chat: \n${e.toString()}` });
		}
	},
	getChat: async (req, res) => {
		try {
			Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
				.populate("users", "-password")
				.populate("groupAdmin", "-password")
				.populate("latestMessage")
				.sort({ updatedAt: -1 })
				.then(async (results) => {
					results = await User.populate(results, {
						path: "latestMessage.sender",
						select: "username profile email",
					});
					//res.status(200).json(results)
					res.status(200).send(results);
				});
		} catch (e) {
			res.status(500).json({ msg: e.toString() });
		}
	},
};
