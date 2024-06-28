require("dotenv").config()


const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const UsersModel = require('./models/Users')
const RentalsModel = require('./models/Rentals')


const app = express()
app.use(express.json())
app.use(cors())


mongoCon = process.env.mongoConnectionString
PORT = process.env.PORT
mongoose.connect(mongoCon)
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('mongodb connection failed');
})

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    UsersModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password === password) {
                res.json("Success")
            } else {
                res.json("the password is incorrect")
            }
        } else {
            res.json("No such Email found")
        }
    })
})

app.post('/register', (req, res) => {
    UsersModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post('/CreateRental', (req,res) => {
    RentalsModel.create(req.body)
    .then(rentals => res.json(rentals))
    .catch(err => res.json(err))
})

app.listen(PORT, () => {
    console.log("server is running")
})