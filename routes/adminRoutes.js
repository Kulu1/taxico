const express = require('express')
const adminController = require('../controllers/adminController')
const authController = require('../controllers/authController')
const router = express.Router()
const {driverAuth, adminAuth, userAuth} = require('../middleware/auth');

router.post('/adminSignup', authController.AdminSignup)
router.post('/adminLogin', authController.AdminLogin)
router.get('/logout', adminAuth,  authController.logout)
router.patch("/updateMePic", authController.protect, adminController.uploadUserPhoto, adminController.updateUserPhoto)
router.patch("/updateMe", authController.protect, adminController.updateUser)

router.patch("/updatePassword", adminAuth, authController.updateAdminPassword)

router
    .route('/')
    .get(adminController.getAllAdmins)
    .post(adminController.createAdmin)

// router
//     .route('/:id')
//     .get(driverController.getDriver)
//     .patch(driverController.updateDriver)
//     .delete(driverController.deleteDriver)

module.exports = router