const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const jobRoute = require("./routes/job");
const bookmarkRoute = require("./routes/bookmark");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
	cloud_name: "dhi9lh1i7",
	api_key: "551543554664557",
	api_secret: "pJtiL4KvqXK7HtTnWW-zfjj-TTI",
	secure: true,
});

dotenv.config();
const port = process.env.PORT || 3000;

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		console.log("Database connected");
	})
	.catch((err) => console.log(err));

app.use(express.json());

app.use("/api/", authRoute);
app.use("/api/user", userRoute);
app.use("/api/job", jobRoute);
app.use("/api/bookmark", bookmarkRoute);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
