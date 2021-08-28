const express = require('express')
const app = express();
const mongoose = require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRoute = require('./routers/Users')
const taskRoute = require('./routers/Tasks')

const bcrypt = require('bcrypt')



app.use(express.json())
app.use(taskRoute)
app.use(userRoute)



module.exports = app