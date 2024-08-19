
const Driver = require('../models/driverModels')
const multer = require("multer")
const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken')



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

        cb(null, "views/img/drivers")
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


        const updatedUser = await Driver.findByIdAndUpdate(userID.id, filteredBody, {
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

        const updatedUser = await Driver.findByIdAndUpdate(userID.id, filteredBody, {
            new: true,
            runValidators: true,
        });
        res.json({ data: updatedUser, status: 'Success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getAllDrivers = async (req, res, next) => {
    try {
        const drivers = await Driver.find();

        if (!drivers) {
            return res.status(404).json({ message: 'No drivers found' });
        }

        const driversArray = Array.isArray(drivers) ? drivers : [drivers];

        res.status(200).json({ data: driversArray, status: 'Success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// get Active driver details using license
exports.getActivedriver = async (req, res, next) => {
    try {
        const drivers = await Driver.find({ status: "Active" });

        if (!drivers) {
            return res.status(404).json({ message: 'No drivers found' });
        }

        const driversArray = Array.isArray(drivers) ? drivers : [drivers];

        res.status(200).json({ data: driversArray, status: 'Success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// get Active driver details using license
exports.getInactivedriver = async (req, res, next) => {
    try {
        const drivers = await Driver.find({ status: "Pending" });

        if (!drivers) {
            return res.status(404).json({ message: 'No drivers found' });
        }

        const driversArray = Array.isArray(drivers) ? drivers : [drivers];

        res.status(200).json({ data: driversArray, status: 'Success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



exports.searchCar = async (req, res) => {
    let payload = req.body.payload.trim();
    let search = await Driver.find({ carType: { $regex: new RegExp("^" + payload + ".*", "i") } }).exec();
    // limit search result to ten
    // search = (await search).slice(0, 10);
    res.send({ payload: search })

}

exports.retrieveCarType = async (req, res, next) => {
    try {
        const carType = req.params.carType; // Get the carType from the URL parameter
        if (!carType) {
            return res.status(400).json({ message: 'Car type parameter is missing in the URL' });
        }

        const drivers = await Driver.find({ carType });

        if (!drivers || drivers.length === 0) {
            return res.status(404).json({ message: `No drivers found for the car type: ${carType}` });
        }
        const carArray = Array.isArray(drivers) ? drivers : [drivers];
        res.status(200).json({ data: carArray, status: 'Success' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createDriver = async (req, res) => {
    try {
        const driver = await Driver.create(req.body);
        // console.log(req.body.name)
        res.json({ data: driver, status: 'Success' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


// get driver details using license
exports.getDriverDetails = async (req, res) => {
    const { license } = req.params;
    const licenseString = license.toString(); // Convert to string

    try {
        const driver = await Driver.findOne({ license: licenseString });

        if (!driver) {
            console.log("Driver not found");
            res.status(404).json({ message: 'Driver not found' });
            return;
        }

        console.log("Found Driver:", driver);

        res.json({ data: driver, status: 'Success' });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: err.message });
    }
};


// delete driver details using license
exports.DriverDeletion = async (req, res) => {
    const { license } = req.params;
    const licenseString = license.toString(); // Convert to string

    try {
        const driver = await Driver.deleteOne({ license: licenseString });

        if (!driver) {
            console.log("Driver not found");
            res.status(404).json({ message: 'Driver delete' });
            return;
        }
        console.log("Found Driver:", driver);

        res.json({ data: driver, status: 'Success' });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: err.message });
    }
};

exports.updateDriver = async (req, res) => {
    try {
        const driver = await Driver.findByIdAndUpdate(req.params.id, req.body);
        res.json({ data: driver, status: 'Success' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.deleteDriver = async (req, res) => {
    try {
        const driver = await Driver.findByIdAndDelete(req.params.id);
        res.json({ data: driver, status: 'Success' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

