const express = require("express")
const router = express.Router()
const viewsController = require("./../controllers/viewController")

router.get("/", viewsController.getHome)
router.get("/loginDriver", viewsController.getDriverLoginForm)
router.get("/loginUser", viewsController.getUserLoginForm)
router.get("/signupDriver", viewsController.getDriverSignupForm)
router.get("/signupUser", viewsController.getUserSignupForm)
router.get("/driverCarTyper", viewsController.getDriverCarType)
router.get("/getOtpHome", viewsController.getOtpHome)
router.get("/getOtpHomeP", viewsController.getOtpHomeP)
router.get("/getFotp", viewsController.getFotp)

router.get("/getPasswordchange", viewsController.getPasswordchange)
router.get("/getadminLogin", viewsController.getadminLogin)
router.get("/getBookPage", viewsController.getBookPage)
router.get("/getDriverRegisterForm", viewsController.getDriverRegisterForm)

module.exports = router