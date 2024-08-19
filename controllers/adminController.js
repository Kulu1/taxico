const Admin = require('../models/adminModels')
const multer = require("multer")
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken')

exports.getAllAdmins = async (req, res, next) => {
    try {
        const admin = await Admin.find()
        res.status(200).json({ data: admin, status: 'Success' })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
exports.createAdmin = async (req, res) => {
    try {
        const admin = await Admin.create(req.body);
        // console.log(req.body.name)
        // createSendToken(admin, 201, res)
        res.json({ data: admin, status: 'Success' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


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

        cb(null, "views/img/admins")
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


        const updatedUser = await Admin.findByIdAndUpdate(userID.id, filteredBody, {
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

        const updatedUser = await Admin.findByIdAndUpdate(userID.id, filteredBody, {
            new: true,
            runValidators: true,
        });
        res.json({ data: updatedUser, status: 'Success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


