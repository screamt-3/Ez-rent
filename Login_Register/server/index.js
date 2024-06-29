require("dotenv").config()


const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const UsersModel = require('./models/Users')
const RentalsModel = require('./models/Rentals')
const bcryptjs = require("bcryptjs")
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())
app.use(cors())
const salt = bcryptjs.genSaltSync(10)

mongoCon = process.env.mongoConnectionString
PORT = process.env.PORT
JWTSecret = process.env.JWTSecret

mongoose.connect(mongoCon)
    .then(() => {
        console.log("mongodb connected");
    })
    .catch(() => {
        console.log('mongodb connection failed');
    })

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    UsersModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (bcryptjs.compareSync(password, user.password)) {
                    /*
                    const token = jwt.sign({id: user._id},
                        JWTSecret,
                    )
                    
                    const {password: pass, ...rest} = validUser._doc;

                    res.status(200).cookie("access_token",token,{httpOnly: true})
                    .json("Success")
                    */
                   res.json("Success")
                } else {
                    res.json("the password is incorrect")
                }
            } else {
                res.json("Success")
            }
        })
})

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    if(!email || !password || email ==="" || password ==="") {
        res.json("Invalid Email and Password")
    } else {
    UsersModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json("Email in use")
            } else {
                const hash = bcryptjs.hashSync(password, salt)
                UsersModel.create({name: name, email: email, password: hash})
                    .then(users => res.json(users))
                    .catch(err => res.json(err))
                res.json("Success")
            }

        })
    }
})

app.post('/CreateRental', (req, res) => {
    RentalsModel.create(req.body)
        .then(rentals => res.json(rentals))
        .catch(err => res.json(err))
})

app.listen(PORT, () => {
    console.log("server is running")
})

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})