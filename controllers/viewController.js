const path = require("path")

// LOG IN PAGE
exports.getDriverLoginForm = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/driver/driver.html"))
}

// LOG IN PAGE
exports.getDriverRegisterForm = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/driver/D-register.html"))
}

// LOG IN PAGE
exports.getUserLoginForm = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/passenger/passenger.html"))
}
// SIGN UP PAGE
exports.getDriverSignupForm = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/driver/D-register.html"))
}

// SIGN UP PAGE
exports.getUserSignupForm = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/passenger/P-register.html"))
}

// HOME PAGE
exports.getHome = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"))
}

// HOME PAGE
exports.getOtpHome = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/otp.html"))
}

// HOME PAGE
exports.getOtpHomeP = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/p-otp.html"))
}

// search PAGE
exports.getDriverCarType = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/passenger/passengerpage2.html"))
}

// search PAGE
exports.getadminLogin = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/admin/adminLogin.html"))
}
// booking PAGE
exports.getPasswordchange = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/F-change.html"));
}

// booking PAGE
exports.getFotp = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/F-otp.html"));
}


// // passanger profile PAGE
// exports.getPassangerProfile = (req, res) => {
//   res.sendFile(path.join(__dirname, "../views/passenger/passengerProfile.html"));
// }

// book PAGE
exports.getBookPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/passenger/passengerpage3.html"))
}