// Imports
require("dotenv").config()

const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const UsersModel = require('./models/Users')
const RentalsModel = require('./models/Rentals')
const bcryptjs = require("bcryptjs")
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');


const app = express()

// Middleware setup
app.use(cookieParser())
//app.use(cors({ origin: 'http://localhost:5173/login', credentials: true}))
app.use(cors())
app.use(express.json())

salt = bcryptjs.genSaltSync(10)
mongoCon = process.env.mongoConnectionString
PORT = process.env.PORT
JWTSecret = process.env.JWTSecret

// MongoDB connection
mongoose.connect(mongoCon)
    .then(() => {
        console.log("mongodb connected");
    })
    .catch(() => {
        console.log('mongodb connection failed');
    })


app.post("/login", (req, res) => { // Login for User
    const { email, password } = req.body;
    UsersModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (bcryptjs.compareSync(password, user.password)) {
                    /*
                    const token = jwt.sign({ id: user._id }, JWTSecret);

                    const { password: pass, ...rest } = user._doc;

                    res.status(200)
                        .cookie("access_token", token, { httpOnly: true })
                        .json("Success")
*/
                    res.json("Success")
                } else {
                    return res.status(401).json("The password is incorrect")
                }
            } else {
                return res.status(404).json("User not found")
            }
        })
        .catch(err => res.status(500).json("Server error"))
})

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
                        //.then(users => res.json(users))
                        .catch(err => res.json(err))
                    res.json("Success")
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
            if(filteredRentals.length > 0) {
                res.json(filteredRentals)
            } else {
                res.status(404).json({message: "None Found"})
            }
        })
        .catch(err => res.status(500).json({ message: "server error "}));
})

app.post('/CreateRental', (req, res) => { // Create new Rental Entry
    RentalsModel.create(req.body)
        .then(rentals => res.json(rentals))
        .catch(err => res.json(err))
})

app.listen(PORT, () => {
    console.log("server is running")
})


app.use((err, req, res, next) => { //
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})
