const express = require('express')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const {userAuth, adminAuth} = require('../middleware/auth');
const router = express.Router()

router.post('/signup', authController.signup)
router.post('/login', authController.login)
router.post('/logout', userAuth, authController.logout)
router.get('/:contact', userController.userFind)
router.patch('/:userdID', userController.userPasswordChange)

router.patch("/updateMePic", authController.protect, userController.uploadUserPhoto, userController.updateUserPhoto)
router.patch("/updateMe", authController.protect, userController.updateUser)

router.patch("/updatePassword", userAuth,authController.updatePassword)
router.get('/admin/getAllUsers', userController.getAllUsers)

// router
//     .route('/')
//     .get(userController.getAllUsers)
//     .post(userController.createUser)

// router
//     .route('/:id')
//     .get(userController.getUser)
// .patch(userController.updateUser)
//     .delete(userController.deleteUser)

module.exports = router