const User = require("../models/User");
const { UploadService } = require("../services/UploadService");

module.exports = {
	updateUser: async (req, res) => {
		try {
			const { id } = req.params;

			const UpdateUser = await User.findByIdAndUpdate(id, req.body);

			const filteredUser = UpdateUser.toObject();
			delete filteredUser.password;
			return res.status(200).json(filteredUser);
		} catch (e) {
			return res.status(500).json(e);
		}
	},
	deleteUser: async (req, res) => {
		try {
			await User.findByIdAndDelete(req.params.id);

			res.status(200).json({ msg: "Successfully deleted" });
		} catch (e) {
			res.status(500).json({ msg: e.toString() });
		}
	},
	getUser: async (req, res) => {
		try {
			const UserModel = await User.findById(req.params.id);
			if (!UserModel) {
				return res.status(404).json({ msg: "User not found" });
			}
			const user = UserModel.toObject();
			delete user.password;
			return res.status(200).json(user);
		} catch (e) {
			return res.status(500).json({ msg: e.toString() });
		}
	},
	getAllUsers: async (req, res) => {
		try {
			const UsersModel = await User.find();
			const users = [];

			for (let i = 0; i < UsersModel.length; i++) {
				let user = UsersModel[i].toObject();
				delete user.password;
				users.push(user);
			}

			return res.status(200).json(users);
		} catch (e) {
			return res.status(500).json({ msg: e.toString() });
		}
	},
	uploadPhoto: async (req, res) => {
		const uploadService = new UploadService();
		try {
			const file = req.file;
			const cloudResp = await uploadService.uploadImage(file);

			const UpdateUser = await User.findByIdAndUpdate(req.user.id, {
				profile: cloudResp.secure_url,
			});

			const filteredUser = UpdateUser.toObject();
			delete filteredUser.password;
			return res.status(200).json(filteredUser);
		} catch (error) {
			res.send({
				message: error.message,
			});
		}
	},
};
