const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const jobRoute = require("./routes/job");
const bookmarkRoute = require("./routes/bookmark");
const chatRoute = require("./routes/chat");
const messagesRoute = require("./routes/messages");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
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
app.use("/api/chat", chatRoute);
app.use("/api/messages", messagesRoute);

const server = app.listen(port, () =>
	console.log(`Example app listening on port ${port}!`)
);

const io = require("socket.io")(server, {
	pingTimeout: 60000,
	cors: {
		//origin: "http://localhost:5000",
		origin: "https://jobappbackend-production-1f10.up.railway.app/",
	},
});

io.on("connection", (socket) => {
	console.log("connected to socket");

	socket.on("setup", (userId) => {
		socket.join(userId);
		socket.broadcast.emit("online-user", userId);
		console.log(`${userId} is online`);
	});

	socket.on("typing", (room) => {
		console.log("typing");
		console.log("room " + room);
		socket.to(room).emit("typing", room);
	});

	socket.on("stop typing", (room) => {
		console.log("stop typing");
		console.log("room " + room);
		socket.to(room).emit("stop typing", room);
	});

	socket.on("join chat", (room) => {
		socket.join(room);
		console.log("User joined: " + room);
	});

	socket.on("new message", (newMessageReceived) => {
		let chat = newMessageReceived.chat;
		let room = chat._id;

		let sender = newMessageReceived.sender;

		if (!sender) {
			console.log("sender is not defined");

			return;
		}

		let senderId = sender._id;
		console.log("socket.on  senderId: ", senderId);
		const users = chat.users;

		if (!users) {
			console.log("User is not defined");
			return;
		}

		socket.to(room).emit("message received", newMessageReceived);
		socket.to(room).emit("message sent", "New Message");
	});

	socket.off("setup", (userId) => {
		console.log(`${userId} is offline`);
		socket.leave(userId);
	});
});
