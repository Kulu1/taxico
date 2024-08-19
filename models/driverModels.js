const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const driverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter your name']
    },
    contact: {
        type: Number,
        required: [true, 'Please enter your contact number'],
    },
    carType: {
        type: String,
        required: [true, 'Please enter your Vehicle Type'],
    },
    photo: {
        type: String,
        default: 'default.jpg',
    },
    license: {
        type: String,
        required: [true, 'Please enter your vehicle type'],
    },
    status: {
        type: String,
        required: [true, 'Please give your status']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        //Password wont be included when we get the users
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: 'Passwords are not same',
        },
    }
})

driverSchema.pre('save', async function (next) {
    // Only runs this code if password is modified
    if (!this.isModified('password')) return next()

    //hash the paswword with the cost of 12
    this.password = await bcrypt.hash(this.password, 12)

    //delete confirmedpassword field
    this.passwordConfirm = undefined
    next()
})

driverSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    if (update.password !== '' &&
        update.password !== undefined &&
        update.password == update.passwordConfirm) {
        //hash the paswword with the cost of 12
        this.password = await bcrypt.hash(this.password, 12)

        //delete confirmedpassword field
        this.passwordConfirm = undefined
        next()
    } else
        next()
})

driverSchema.methods.correctPassword = async function (
    candidatePassword,
    driverPassword
) {
    return await bcrypt.compare(candidatePassword, driverPassword)
}
const Driver = mongoose.model('Driver', driverSchema)
module.exports = Driver