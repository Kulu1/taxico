const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: [true, 'Booking must contain date']
    },
    time: {
        type: String,
        required: [true, 'Booking must contain time']
    },
    contact: {
        type: Number,
        default: 0, // Default value for contact
    },
    license: {
        type: String,
        default: 'N/A', // Default value for license
    },
    status: {
        type: String,
        default: 'Pending', // Default value for status
    },
});

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking

