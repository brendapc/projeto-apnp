const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const userRoute = require('./routes/user')
const ticketsRoute = require('./routes/tickets')

const app = express()


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

app.use('/tickets', ticketsRoute)
app.use('/users', userRoute)

app.listen(8989, () => {
    console.log('server running ✔')
})