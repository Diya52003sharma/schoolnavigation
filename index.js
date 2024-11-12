const express = require('express')
const app = express()
const db = require('./server/config/db')
const seed = require('./server/config/seed')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('./server/public/'))
// app.use(express.static(__dirname+"/server/public/"))
const cors = require('cors');
app.use(cors());
app.use(express.static('./build'))
const adminRoutes = require("./server/routes/adminRoutes")
app.use('/admin', adminRoutes)

const schoolRoutes = require("./server/routes/schoolRoutes")
app.use('/school', schoolRoutes)

const parentRoutes = require("./server/routes/parentRoutes")
app.use('/parent', parentRoutes)

app.listen(5000, (err) => {
  if (err) {
    console.log("Error Occured", err)
  }
  else {
    console.log("Server Is Running")
  }
})