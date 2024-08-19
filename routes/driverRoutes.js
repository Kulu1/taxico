const express = require('express')
const driverController = require('../controllers/driverController')
const authController = require('../controllers/authController')
const router = express.Router()
const {userAuth, adminAuth, driverAuth} = require('../middleware/auth');

router.post('/driverSignup', authController.DriverSignup)
router.post('/driverLogin', authController.DriverLogin)
router.get('/getAlldriver', driverController.getAllDrivers)
router.post('/searchCar', driverController.searchCar)
router.get('/retrieveCarType/:carType', driverController.retrieveCarType)
router.get('/getDriverDetails/:license', driverController.getDriverDetails);

router.get('/logout', adminAuth, authController.logout)
router.get('/getActivedriver',  driverController.getActivedriver);
router.get('/getInactivedriver',driverController.getInactivedriver);
router.delete('/deleteDriver/:license', driverController.DriverDeletion);



router.patch("/updateMePic", authController.protect, driverController.uploadUserPhoto, driverController.updateUserPhoto)
router.patch("/updateMe", authController.protect, driverController.updateUser)


router.route('/:id').patch(driverController.updateDriver).delete(driverController.deleteDriver)

router.patch("/updatePassword", driverAuth, authController.updateDriverPassword)
// router
//     .route('/')
//     .get(driverController.getAllDrivers)
//     .post(driverController.createDriver)

// router
//     .route('/:id')
//     .get(driverController.getDriver)
//     .patch(driverController.updateDriver)
//     .delete(driverController.deleteDriver)

module.exports = router
