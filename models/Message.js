const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
	{
		content: {
			type: String,
			trim: true,
		},
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		receiver: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		chat: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Chat",
		},
		readBy: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
	},
	{
		timestamps: true,
	}
);
module.exports = mongoose.model("Message", MessageSchema);
