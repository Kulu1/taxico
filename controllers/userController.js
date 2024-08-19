const User = require('../models/userModels')
const Driver = require('../models/driverModels')
const Admin = require('../models/adminModels')
const multer = require("multer")
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken')

// profile picture
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

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("reached1")

        cb(null, "views/img/users")
    },
    filename: async (req, file, cb) => {
        try {
            const cookieHeader = req.headers.cookie;
            // Get the JWT token from the Cookie header
            const token = getCookieValue(cookieHeader, 'jwt');

            // Decode the token using async/await
            const userID = await jwt.verify(token, process.env.JWT_SECRET);

            const ext = file.mimetype.split("/")[1];
            const fileName = `user-${userID}-${Date.now()}.${ext}`;
            cb(null, fileName);
        } catch (err) {
            console.error('Error decoding token:', err);
            cb(err); // Pass the error to the callback
        }
    },

})

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        console.log("reached image")
        cb(null, true)
    } else {
        cb(new AppError("Not an image! Please upload only images", 400), false)
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
})

exports.uploadUserPhoto = upload.single("photo")

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    const obj1 = {
        name: 'soname',
        contact: '77231123',
        photo: {},
        otherField: 'some value',
    };
    console.log("photo", obj.photo)

    Object.keys(obj1).forEach((el) => {
        if (obj1.hasOwnProperty(el) && allowedFields.includes(el)) {
            newObj[el] = obj[el];
        }
    });
    console.log("newObj", newObj);
    return newObj;
};

exports.updateUserPhoto = async (req, res) => {
    try {
        console.log("photo", req.file.filename)

        const filteredBody = filterObj(req.body, "name", "contact");

        if (req.body.photo !== "undefined") {
            filteredBody.photo = req.file.filename;
        }

        console.log("filter", filteredBody)
        const cookieHeader = req.headers.cookie;
        // Get the JWT token from the Cookie header
        const token = getCookieValue(cookieHeader, 'jwt');

        // Decode the token using async/await
        const userID = await jwt.verify(token, process.env.JWT_SECRET);
        console.log(userID)


        const updatedUser = await User.findByIdAndUpdate(userID.id, filteredBody, {
            new: true,
            runValidators: true,
        });
        res.json({ data: updatedUser, status: 'Success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        console.log(req)

        const filteredBody = filterObj(req.body, "name", "contact");

        // if (req.body.photo !== "undefined") {
        //     filteredBody.photo = req.file.filename;
        // }

        const cookieHeader = req.headers.cookie;
        // Get the JWT token from the Cookie header
        const token = getCookieValue(cookieHeader, 'jwt');

        // Decode the token using async/await
        const userID = await jwt.verify(token, process.env.JWT_SECRET);
        console.log("filter", filteredBody)

        const updatedUser = await User.findByIdAndUpdate(userID.id, filteredBody, {
            new: true,
            runValidators: true,
        });
        res.json({ data: updatedUser, status: 'Success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//find user or driver or admin
exports.userFind = async (req, res, next) => {
    try {
        // console.log("req", req.params.contact)
        // console.log("reqBody", req.body)
        const contact = req.params.contact;
        var users = await User.find({ contact })
        var drivers = await Driver.find({ contact })
        var admins = await Admin.find({ contact })

        if (users.length !== 0) {
            res.status(200).json({ data: users, status: 'Success' });
        } else if (drivers.length !== 0) {
            res.status(200).json({ data: drivers, status: 'Success' });
        } else if (admins.length !== 0) {
            res.status(200).json({ data: admins, status: 'Success' });
        } else {
            res.status(404).json({ status: 'No users found', data: [] });
        }
        // res.status(200).json({ data: users, status: 'Success' })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


//find user or driver or admin password change
// Find user or driver or admin and change password
exports.userPasswordChange = async (req, res, next) => {
    try {
        const userdID = req.params.userdID;

        const user = await User.findById(userdID)
        const driver = await Driver.findById(userdID)
        const admin = await Admin.findById(userdID)

        const newPassword = req.body.password;
        const ConfirmPassword = req.body.passwordConfirm;

        if (user !== null) {
            console.log("reached user")

            // 3) If so, update password
            user.password = newPassword;
            user.passwordConfirm = ConfirmPassword;
            await user.save();
            res.status(200).json({
                status: 'success',
                data: {
                    user
                }
            })
        } else {
            if (driver !== null) {
                console.log("reached dricer")

                // 3) If so, update password
                driver.password = newPassword;
                driver.passwordConfirm = ConfirmPassword;
                await driver.save();
                res.status(200).json({
                    status: 'success',
                    data: {
                        driver
                    }
                })
            } else if (admin !== null) {
                console.log("reached admin")

                // 3) If so, update password
                admin.password = newPassword;
                admin.passwordConfirm = ConfirmPassword;
                await admin.save();
                res.status(200).json({
                    status: 'success',
                    data: {
                        admin
                    }
                })
            } else {
                // No user, driver, or admin found with the provided contact number
                res.status(404).json({ status: 'No user found with the given contact number', data: [] });
            }
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        if (!users) {
            return res.status(404).json({ message: 'No drivers found' });
        }

        const userArray = Array.isArray(users) ? users : [users];

        res.status(200).json({ data: userArray, status: 'Success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        // console.log(req.body.name)
        res.json({ data: user, status: 'Success' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json({ data: user, status: 'Success' })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.json({ data: user, status: 'Success' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}