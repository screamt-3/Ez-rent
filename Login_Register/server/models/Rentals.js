const mongoose = require('mongoose')

const RentalsSchema  = new mongoose.Schema({
    name: String,
    owner: String,
    location: String,
    number_of_rooms: String
})

const RentalsModel = mongoose.model("Rentals", RentalsSchema)
module.exports = RentalsModel