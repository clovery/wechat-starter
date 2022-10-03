import express from 'express'
import serveStatic from 'serve-static'
import logger from 'morgan'
import bodyParser from 'body-parser'

import go from './routes/global'
import wechatRouter from './routes/wechat'

const app = express()

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

app.listen(4100, function () {
  console.log('Server is running on 18080!')
})

go.updateMenu()
