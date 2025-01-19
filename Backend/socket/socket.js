import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:5713"],
		methods: ["GET", "POST"],
		credentials: true,
	},
});

const userSocketMap = {}; // {userId: socketId}
const groupMap = {}; // {groupId: { groupName, members: [userId], messages: [] }}

// Helper function to get a user's socket ID
export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
	console.log("A user connected", socket.id);

	const userId = socket.handshake.query.userId;
	if (userId !== "undefined") {
		userSocketMap[userId] = socket.id;
	}

	// Notify all clients about online users
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// Handle creating a group
	socket.on("createGroup", ({ groupId, groupName, members }) => {
		if (!groupMap[groupId]) {
			groupMap[groupId] = { groupName, members, messages: [] };

			// Notify all group members about the new group
			members.forEach((memberId) => {
				const socketId = userSocketMap[memberId];
				if (socketId) {
					io.to(socketId).emit("groupCreated", { groupId, groupName, members });
				}
			});

			console.log(`Group created: ${groupName} with members`, members);
		} else {
			socket.emit("error", { message: "Group already exists!" });
		}
	});

	// Handle sending a message to a group
	socket.on("sendMessageToGroup", ({ groupId, message }) => {
		const group = groupMap[groupId];
		if (group) {
			// Add the message to the group's message list
			group.messages.push(message);

			// Notify all members of the group about the new message
			group.members.forEach((memberId) => {
				const socketId = userSocketMap[memberId];
				if (socketId) {
					io.to(socketId).emit("newGroupMessage", { groupId, message });
				}
			});
		} else {
			socket.emit("error", { message: "Group does not exist!" });
		}
	});

	// Handle user disconnect
	socket.on("disconnect", () => {
		console.log("User disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };
