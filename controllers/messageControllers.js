const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    res.status(400);
    throw new Error("content and chatId are required");
  }

  let message = await Message.create({
    sender: req.user._id,
    content,
    chat: chatId,
  });

  message = await message.populate("sender", "name pic email");

  message = await message.populate({
    path: "chat",
    populate: { path: "users", select: "name pic email" },
  });

  await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

  res.json(message);
});

const allMessages = asyncHandler(async (req, res) => {
  const { chatId } = req.params;

  const messages = await Message.find({ chat: chatId })
    .populate("sender", "name pic email")
    .populate({
      path: "chat",
      populate: { path: "users", select: "name pic email" },
    })
    .sort({ createdAt: 1 });

  res.json(messages);
});

module.exports = { sendMessage, allMessages };
