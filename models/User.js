const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		location: {
			type: String,
			required: false,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		isAgent: {
			type: Boolean,
			default: false,
		},
		skills: {
			type: Array,
			default: [],
		},
		profile: {
			type: String,
			required: true,
			default:
				"https://i.pinimg.com/originals/71/f3/51/71f3519243d136361d81df71724c60a0.png",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
