const express = require('express')
const cors = require('cors')
const itemsRouter = require('./routes/items')


const app = express()

app.use(express.json())

app.use(cors())

app.use('/api', itemsRouter)

app.listen('8080', () => {
    console.log("Running on 8080")
})