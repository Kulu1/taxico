const express = require('express')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const path = require("path")
const bodyParser = require('body-parser');
const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())
const userRouter = require('./routes/userRoutes')
const driverRouter = require('./routes/driverRoutes')
const adminRouter = require('./routes/adminRoutes')
const bookingRouter = require("./routes/bookingRoute")
const viewRouter = require("./routes/viewRoutes")


app.use(express.json())
// app.use(express.urlencoded())
app.use(express.static("views"))


app.use('/api/users', userRouter)
app.use('/api/drivers', driverRouter)
app.use('/api/admins', adminRouter)
app.use('/api/bookings', bookingRouter)
app.use("/", viewRouter)

app.use(bodyParser.json());

app.post('/send-sms', async (req, res) => {

  try {
    const { to, message } = req.body;

    client.messages
      .create({
        body: message,
        from: '+13203734083',
        to: to,
      })
      .then((message) => {
        console.log(message.sid);
        res.status(200).json({ status: 'success' });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

module.exports = app
