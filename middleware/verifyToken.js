const User = require("../models/User");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const verifyToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];

	if (authHeader) {
		const token = authHeader.split(" ")[1];
		try {
			const verified = jwt.verify(token, process.env.JWT_SECRET);
			if (verified) {
				req.user = verified;
				next();
			} else {
				res.json({ msg: "Invalid token" });
			}
		} catch (err) {
			res.json({ msg: err.toString() });
		}
	} else {
		res.json({ msg: "Unauthorized" });
	}
};

const verifyAndAuthorization = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.id === req.params.id) {
			next();
		} else {
			res.status(403).json({ msg: "You are not allowed" });
		}
	});
};

const verifyAndAdmin = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.isAdmin) {
			next();
		} else {
			res.status(403).json({ msg: "You are not allowed" });
		}
	});
};

module.exports = {
	verifyToken,
	verifyAndAuthorization,
	verifyAndAdmin,
};
