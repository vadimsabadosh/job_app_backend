const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const expressJSDocSwagger = require("express-jsdoc-swagger");
const mainRouter = require("./routes");
const startSocket = require("./socket");
const options = require("./swagger/options.js");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");

const allowlist = ["http://localhost:3000", "http://127.0.0.1:3000"];

const corsOptions = {
	origin: allowlist,
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
	maxAge: 600,
};
app.use(cors(corsOptions));

dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	secure: true,
});

const port = process.env.PORT || 3000;

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		console.log("Database connected");
	})
	.catch((err) => console.log(err));

app.use(express.json());

app.use("/api/", mainRouter);

expressJSDocSwagger(app)(options);

const server = app.listen(port, () =>
	console.log(`Example app listening on port ${port}!`)
);

startSocket(server);
