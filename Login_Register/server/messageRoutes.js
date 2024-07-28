const express = require('express');
const router = express.Router();
const ChatModel = require('./models/Chat')
const MessageModel = require('./models/Message')
const UsersModel = require('./models/Users')
const jwt = require('jsonwebtoken')

const JWTSecret = process.env.JWTSECRET



const authMiddleware = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(403).json("Not authenticated");
    }
    try {

        const data = jwt.verify(token, JWTSecret);
        req.userid = data.id;
        next();
    } catch {
        return res.status(403).json("Invalid token");
    }
};


// Send a message
router.post('/messages', authMiddleware, (req, res) => {
    const { sender, receiver, content } = req.body.message;
    console.log(sender, receiver, content)
    MessageModel.create({ sender, receiver, content })
        .then(message => res.json(message))
        .catch(err => res.status(500).json({ error: err.message }))
})

router.post('/chat', authMiddleware, (req, res) => {
    const { owner, rental } = req.body
    const senderId = req.userid
    const receiver = owner._id;
    ChatModel.findOne({
        $or: [
            { sender: senderId, receiver: receiver._id },
            { sender: receiver._id, receiver: senderId },
        ]
    })
        .then(chat => {
            if (chat) {
                return res.json(chat)
            } else {
                UsersModel.findById(senderId)
                    .then(sender =>
                        ChatModel.create({
                            sender: sender._id,
                            senderName: sender.name,
                            receiver: owner._id,
                            receiverName: owner.name
                        }))
                    .then(chat => {
                        res.json(chat)
                    })
                    .catch(err => res.status(500).json({ error: err.message }));
            }
        }).catch(err => res.status(500).json({ error: err.message }));
})


// Get messages between two users
router.get('/messages/:chatid', (req, res) => {
    const { chatid } = req.params;

    ChatModel.findById(chatid)
        .then(chat => {
            const user1 = chat.sender
            const user2 = chat.receiver
            MessageModel.find({
                $or: [
                    { sender: user1, receiver: user2 },
                    { sender: user2, receiver: user1 }
                ]
            })
                .sort('timestamp')
                .then(messages => {
                    res.json({ messages, user1, user2 })
                })
                .catch(err => res.status(500).json({ error: err.message }));
        })

});

router.get('/chat/:chatId', (req, res) => {
    const { chatId } = req.params;

    ChatModel.findById(chatId)
        .populate('participants', 'name email')
        .populate('messages.sender', 'name email')
        .then(chat => res.json(chat))
        .catch(err => res.status(500).json({ message: "Internal Server Error" }));
});

router.post('/chat', (req, res) => {
    const { participants, text, sender } = req.body;

    ChatModel.findOneAndUpdate(
        { participants: { $all: participants } },
        { $push: { messages: { sender, text } } },
        { new: true, upsert: true }
    )
        .then(chat => res.json(chat))
        .catch(err => res.status(500).json({ message: "Internal Server Error" }));
});

router.get('/userId/chats', authMiddleware, (req, res) => {
    const id = req.userid;

    ChatModel.find({
        $or: [
            { sender: id },
            { receiver: id }
        ]
    })
        .then(chats => res.json(chats))
        .catch(err => res.status(500).json({ message: "Internal Server Error" }));
});

module.exports = router;
