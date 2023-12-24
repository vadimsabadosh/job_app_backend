const startSocket = (server) => {
	const io = require("socket.io")(server, {
		pingTimeout: 60000,
		cors: {
			//origin: "http://localhost:5000",
			origin: process.env.SOCKET_URL_ORIGIN,
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
};
module.exports = startSocket;
