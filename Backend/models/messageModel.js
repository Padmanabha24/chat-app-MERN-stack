import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, //
    },
    receiverId: { // Fixed typo in the field name
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Fixed typo
    },
    message: {
      type: String,
      required: true, // Fixed typo
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
