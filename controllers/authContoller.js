const User = require("../models/User");
const crypto = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
	createUser: async (req, res) => {
		const { username, email, password } = req.body;
		try {
			const hashedPass = crypto.AES.encrypt(
				password,
				process.env.CRYPTO_SECRET
			);
			const newUser = new User({
				username,
				email,
				password: hashedPass,
			});

			const savedUser = await newUser.save();
			const user = savedUser.toObject();
			const verified = jwt.sign(
				{ id: user._id, isAdmin: user.isAdmin },
				process.env.JWT_SECRET
			);

			delete user.password;
			return res.status(200).json({ ...user, token: verified });
		} catch (e) {
			return res.status(500).json(e);
		}
	},
	loginUser: async (req, res) => {
		try {
			const { email, password } = req.body;
			if (!email || !password) {
				console.log("!email || !password");

				return res.status(401).json({ msg: "Password or email is not valid" });
			}
			const user = await User.findOne({ email }).select("+password");
			if (!user) {
				console.log("!user");

				return res.status(404).json({ msg: "User does not exist" });
			}
			const decrypted = crypto.AES.decrypt(
				user.password,
				process.env.CRYPTO_SECRET
			);
			const dpass = decrypted.toString(crypto.enc.Utf8);
			if (dpass !== password) {
				return res.status(401).json({ msg: "Password or email is not valid" });
			}
			const verified = jwt.sign(
				{ id: user._id, isAdmin: user.isAdmin },
				process.env.JWT_SECRET
			);
			const filteredUser = user.toObject();
			delete filteredUser.password;
			return res.status(200).json({ ...filteredUser, token: verified });
		} catch (e) {
			return res.status(500).json({ msg: e.toString() });
		}
	},
	logoutUser: async (req, res) => {
		return res.status(200).json({ ok: true });
	},
};
