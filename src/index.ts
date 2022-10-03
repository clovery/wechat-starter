require('dotenv').config({
  debug: true
})
import express from 'express'
import serveStatic from 'serve-static'
import logger from 'morgan'
import bodyParser from 'body-parser'

import wechatRouter from './routes/wechat/wechat'

const app = express()
const PORT = 4100

app.use(logger('short'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(serveStatic('public'))
app.enable('view cache')

app.use('/wechat', wechatRouter)

// Welcome
app.get('/', function (req, res) {
  res.status(200).send('Welcome to Anywhere Node Server!')
})

app.listen(PORT, function () {
  console.log(`Server is running on ${PORT}!`)
})
