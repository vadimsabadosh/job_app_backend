const Message = require("../models/Message");
const User = require("../models/User");
const Chat = require("../models/Chat");

module.exports = {
	sendMessage: async (req, res) => {
		const { content, chatId, receiver } = req.body;

		if (!content || !chatId || !receiver) {
			return res.status(400).json({ msg: "All data must be provided." });
		}

		const newMessage = {
			sender: req.user.id,
			content,
			receiver,
			chat: chatId,
		};
		try {
			let message = await Message.create(newMessage);

			message = await message.populate("sender", "username profile email");
			message = await message.populate("chat");
			message = await User.populate(message, {
				path: "chat.users",
				select: "username profile email",
			});

			await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

			return res.json(message);
		} catch (e) {
			res.status(500).json({ msg: e.toString() });
		}
	},
	getMessages: async (req, res) => {
		try {
			const pageSize = req.query.pageSize || 12;
			const page = req.query.page || 1;
			const skipMessages = page - 1 + pageSize;

			// Find messages with pagination
			let messages = await Message.find({ chat: req.params.id })
				.populate("sender", "username profile email")
				.populate("chat")
				.sort({ createdAt: -1 })
				.skip(skipMessages === pageSize ? 0 : skipMessages)
				.limit(pageSize);

			messages = await User.populate(messages, {
				path: "chat.users",
				select: "username profile email",
			});

			return res.json(messages);
		} catch (e) {
			res.status(500).json({ msg: e.toString() });
		}
	},
};
