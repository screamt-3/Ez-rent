// Imports
require("dotenv").config()

const messageRoutes = require('./messageRoutes')
const ChatModel = require('./models/Chat')
const RentalsModel = require('./models/Rentals')
const UsersModel = require('./models/Users')
const bcryptjs = require("bcryptjs")
const cookieParser = require('cookie-parser')
const cors = require("cors")
const express = require("express")
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const app = express()

// Middleware setup



const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())


const salt = bcryptjs.genSaltSync(10)
const mongoCon = process.env.mongoConnectionString
const PORT = process.env.PORT
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

// MongoDB connection
mongoose.connect(mongoCon)
    .then(() => {
        console.log("mongodb connected");
    })
    .catch(() => {
        console.log('mongodb connection failed');
    })

app.use('/api', messageRoutes); // Messages Feature

app.post('/chat', (req, res) => {
    const { participants, text, sender } = req.body;

    ChatModel.findOneAndUpdate(
        { participants: { $all: participants } },
        { $push: { messages: { sender, text } } },
        { new: true, upsert: true }
    )
        .then(chat => res.json(chat))
        .catch(err => res.status(500).json({ message: "Internal Server Error" }));
});

app.get('/chat/:chatId', (req, res) => {
    const { chatId } = req.params;

    ChatModel.findById(chatId)
        .populate('participants', 'name email')
        .populate('messages.sender', 'name email')
        .then(chat => res.json(chat))
        .catch(err => res.status(500).json({ message: "Internal Server Error" }));
});

app.get('/user/:id/chats', (req, res) => {
    const userId = req.params.id;
    ChatModel.find({ $or: [{ sender: userId }, { receiver: userId }] })
        .then(chats => res.json(chats))
        .catch(err => res.status(500).json({ message: "Internal Server Error" }));
});

app.get('/user/:userId/chats', (req, res) => {
    const { userId } = req.params;
    
    ChatModel.find({ participants: userId })
        .populate('participants', 'name email')
        .populate('messages.sender', 'name email')
        .then(chats => res.json(chats))
        .catch(err => res.status(500).json({ message: "Internal Server Error" }));
});

app.post("/login", (req, res) => { // Login for User
    const { email, password } = req.body;

    UsersModel.findOne({ email: new RegExp(`^${email}$`, 'i') })
        .then(user => {
            if (user) {
                if (bcryptjs.compareSync(password, user.password)) {

                    const token = jwt.sign(
                        { id: user._id }, JWTSecret);

                    return res.status(200)
                        .cookie("access_token", token, {
                            httpOnly: true,
                            secure: true,
                            sameSite: "none",
                        })
                        .json("Success")

                    //return res.json(`${user._id}`)
                } else {
                    return res.status(401).json("The password is incorrect")
                }
            } else {
                return res.status(404).json(`email not found`)
            }
        })
        .catch(err => res.status(500).json("Server gg"))
})

app.get("/check-auth", (req, res) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json("Not authenticated");
    }
    try {
        const data = jwt.verify(token, JWTSecret);
        res.status(200).json({ authenticated: true, user: data.UserInfo });
    } catch {
        res.status(401).json("Invalid token");
    }
});

app.get("/protected", authMiddleware, (req, res) => {
    res.json("This is a protected route");
});

app.post('/register', (req, res) => { // Creates new User Entry
    const { name, email, password } = req.body;

    if (!email || !password || email === "" || password === "") {
        res.json("Invalid Email and Password")
    } else {
        UsersModel.findOne({ email: email })
            .then(user => {
                if (user) {
                    res.json("Email in use")
                } else {
                    const hash = bcryptjs.hashSync(password, salt)
                    UsersModel.create({ name: name, email: email, password: hash })
                        .then(() => res.json("Success"))
                        .catch(err => res.json(err))
                }
            })
    }
})

app.get("/rentals", (req, res) => { // Search for Rental units containing the query
    const condition = req.query.condition
    RentalsModel.find({
        $or: [
            { type: { $regex: condition, $options: 'i' } }, // search for type
            { location: { $regex: condition, $options: 'i' } }, // search for location
            { number_of_rooms: { $eq: parseInt(condition) } } // search for number_of_rooms
        ]
    })
        .then(filteredRentals => { // Handle filter not found
            if (filteredRentals.length > 0) {
                res.json(filteredRentals)
            } else {
                res.status(404).json({ message: "None Found" })
            }
        })
        .catch(err => res.status(500).json({ message: "server error " }));
})

app.get("/rental/:id", (req, res) => {
    const { id } = req.params;
    RentalsModel.findById(id)
        .then(rental => {
            if (rental) {
                UsersModel.findById(rental.owner)
                .then(owner => {
                    console.log(owner)
                    res.json({ owner, rental })})
            } else {
                res.status(404).json({ message: "Rental not found" });
            }
        })
        .catch(err => res.status(500).json({ message: "Internal Server Error" }));
});

app.get("/userid", authMiddleware, (req, res) => {
    const id = req.userid;
    UsersModel.findById(id)
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        })
        .catch(err => res.status(500).json({ message: "Internal Server Error" }));
});

app.get("/userInfo", authMiddleware, (req, res) => {
    const id = req.userid;
    UsersModel.findById(id)
        .then(user => {
            if (user) {
                RentalsModel.find({ owner: id })
                    .then(rentals => (
                        ChatModel.find({
                            $or: [
                            { sender: id },
                            { receiver: id }
            ]}).then(chats => res.json({ user, rentals, chats}))
                    ))
            } else {
                res.status(404).json({ message: "User not found" });
            }
        })
        .catch(err => res.status(500).json({ message: "Internal Server Error" }));
});


app.post('/CreateRental', authMiddleware, (req, res) => {
    const { type, owner, location, number_of_rooms } = req.body;

    RentalsModel.create({ type, owner, location, number_of_rooms })
        .then(rental => {
            UsersModel.findByIdAndUpdate(
                owner, 
                { $push: { rentals: rental._id } },
                { new: true }
            )
            .then(user => res.json({ rental, user }))
            .catch(err => res.status(500).json({ error: err.message }));
        })
        .catch(err => res.status(500).json({ error: err.message }));
});


app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})
