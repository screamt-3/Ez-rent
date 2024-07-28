const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    senderName: String,
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiverName: String,
});

const ChatModel = mongoose.model("Chat", ChatSchema);
module.exports = ChatModel;
