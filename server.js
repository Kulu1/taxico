const app = require('./app')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

const DB = process.env.DATABASE.replace(
    'PASSWORD',
    process.env.DATABASE_PASSWORD,
)

mongoose.connect(DB).then((con) => {
    // console.log(con.connections)
    console.log('DB connection successful')
}).catch(error => console.log(error));

// Starting the server on port 4001
const port = 4000
app.listen(port, () => {
    console.log(`App running on port ${port} ..`)
})