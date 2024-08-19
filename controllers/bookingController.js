const Booking = require('../models/bookingModels');

exports.getAllBooking = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json({
            status: 'success',
            results: bookings.length,
            data: {
                bookings
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.getBooking = async (req, res) => {
    try {
        const AllBookings = await Booking.findById(req.params.id);

        res.status(200).json({
            status: 'success',
            data: {
                AllBookings
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}


exports.createBooking = async (req, res) => {
    try {
        const newBooking = await Booking.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                booking: newBooking
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.updateBooking = async(req, res) => {
    try{
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body);
        res.json({data: booking, status: 'Success'})
    } catch(err){
        res.status(500).json({error: err.message})
    }
}

exports.deleteBooking = async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}
