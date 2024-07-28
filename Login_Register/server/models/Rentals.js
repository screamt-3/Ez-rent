const mongoose = require('mongoose')

const RentalsSchema  = new mongoose.Schema({
    type: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    location: String,
    number_of_rooms: String,
})

const RentalsModel = mongoose.model("Rentals", RentalsSchema)
module.exports = RentalsModel