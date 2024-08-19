const User = require('./../models/userModels')
const jwt = require('jsonwebtoken')
const AppError = require('../utils/appError')
const Driver = require('../models/driverModels')
const Admin = require('../models/adminModels')
const { promisify, isNullOrUndefined } = require("util")

//password change

exports.updateDriverPassword = async (req, res, next) => {
    try {
        console.log("reached")
        console.log(req.body)
        // 1) Get user from collection
        const user = await Driver.findById(req.body.userId).select("+password");

        // 2) Check if posted current password is correct
        if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
            return next(new AppError("Your current password is wrong", 401));
        }

        // 3) If so, update password
        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        await user.save();

        // 4) Log user in, send JWT
        createSendToken(user, 200, res);
    } catch (err) {
        // Handle JWT-related errors explicitly
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }

        res.status(500).json({ error: err.message });
    }
};

exports.updatePassword = async (req, res, next) => {
    try {
        console.log("reached")
        console.log(req.body)
        // 1) Get user from collection
        const user = await User.findById(req.body.userId).select("+password");

        // 2) Check if posted current password is correct
        if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
            return next(new AppError("Your current password is wrong", 401));
        }

        // 3) If so, update password
        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        await user.save();

        // 4) Log user in, send JWT
        createSendToken(user, 200, res);
    } catch (err) {
        // Handle JWT-related errors explicitly
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }

        res.status(500).json({ error: err.message });
    }
};


//admin password

exports.updateAdminPassword = async (req, res, next) => {
    try {
        console.log("reached")
        console.log(req.body)
        // 1) Get user from collection
        const user = await Admin.findById(req.body.userId).select("+password");

        // 2) Check if posted current password is correct
        if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
            return next(new AppError("Your current password is wrong", 401));
        }

        // 3) If so, update password
        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        await user.save();

        // 4) Log user in, send JWT
        createSendToken(user, 200, res);
    } catch (err) {
        // Handle JWT-related errors explicitly
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }

        res.status(500).json({ error: err.message });
    }
};


// Function to extract a specific cookie value by name
function getCookieValue(cookieString, cookieName) {
    const cookies = cookieString.split('; ');
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === cookieName) {
            return value;
        }
    }
    return null;
}

exports.protect = async (req, res, next) => {
    try {
        // 1) Getting token and check if it's there
        console.log("access reached")
        const cookieHeader = req.headers.cookie;
        console.log("cookieeHeaders", cookieHeader)
        // Get the JWT token from the Cookie header
        const token = getCookieValue(cookieHeader, 'jwt');
        console.log("token", token)
        console.log(!token)


        if (!token) {
            console.log("access denied")
            return next(new AppError("You are not logged in! Please log in to get access.", 401));
        }

        // 2) Verify token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        console.log("decoded", decoded)
        console.log("decodedId", decoded.id)

        // 3) Check if user still exists
        if (!decoded || !decoded.id) {
            console.log("access denied")

            return next(new AppError("The user belonging to this token no longer exists", 401));
        }
        console.log("reachar")
        // Grant access to protected route
        req.user = decoded; // Make the user data available in the request
        console.log("access granted")
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.signup = async (req, res, next) => {
    try {
        const newUser = await User.create(req.body)
        // createSendToken(newUser, 201, res)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.login = async (req, res, next) => {
    try {
        const { contact, password } = req.body
        // 1) Check if contact and password exist
        if (!contact || !password) {
            return next(new AppError('Please provide contact and password!', 400))
        }
        // 2) Check if user exists && password is correct
        const user = await User.findOne({ contact }).select('+password')
        const correct = await user.correctPassword(password, user.password)

        if (!user || !correct) {
            return next(new AppError('Incorrect credentials', 401))
        }
        // console.log(user)
        // 3) If everything ok, send token to client
        createSendToken(user, 200, res)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id)
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
    }
    res.cookie('session_id', token, cookieOptions)
    // Remove password from output
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    })
}

//admin signup


exports.DriverSignup = async (req, res, next) => {
    try {
        const newDriver = await Driver.create(req.body)
        createSendToken(newDriver, 201, res)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.DriverLogin = async (req, res, next) => {
    try {
        const { contact, password } = req.body
        // 1) Check if contact and password exist
        if (!contact || !password) {
            return next(new AppError('Please provide contact and password!', 400))
        }
        // 2) Check if user exists && password is correct
        const driver = await Driver.findOne({ contact }).select('+password')
        const correct = await driver.correctPassword(password, driver.password)

        if (!driver || !correct) {
            return next(new AppError('Incorrect credentials', 401))
        }

        // 3) If everything ok, send token to client
        createDriverSendToken(driver, 200, res)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// const signToken = id => {
//     return jwt.sign({id}, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRES_IN,
//     })
// }

const createDriverSendToken = (driver, statusCode, res) => {
    const token = signToken(driver._id)
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
    }
    res.cookie('jwt', token, cookieOptions)
    // Remove password from output
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            driver
        }
    })
}


exports.AdminSignup = async (req, res, next) => {
    try {
        const newAdmin = await Admin.create(req.body)
        createSendToken(newAdmin, 201, res)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.AdminLogin = async (req, res, next) => {
    try {
        const { contact, password } = req.body
        // 1) Check if contact and password exist
        if (!contact || !password) {
            return next(new AppError('Please provide contact and password!', 400))
        }
        // 2) Check if user exists && password is correct
        const admin = await Admin.findOne({ contact }).select('+password')
        const correct = await admin.correctPassword(password, admin.password)

        if (!admin || !correct) {
            return next(new AppError('Incorrect credentials', 401))
        }

        // 3) If everything ok, send token to client
        createAdminSendToken(admin, 200, res)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// const signToken = id => {
//     return jwt.sign({id}, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRES_IN,
//     })
// }

const createAdminSendToken = (admin, statusCode, res) => {
    const token = signToken(admin._id)
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
    }
    res.cookie('jwt', token, cookieOptions)
    // Remove password from output
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            admin
        }
    })
}


exports.logout = (req, res) => {
    console.log('logout')
    res.cookie('session_id', '', {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({ status: 'success' })
}
