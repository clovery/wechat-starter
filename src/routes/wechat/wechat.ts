import express from 'express'
import wechat from 'wechat'
import global from './global'
import { oauth } from './oauth'

var router = express.Router({})

var eventArray = [
  'subscribe',
  'unsubscribe',
  'SCAN',
  'LOCATION',
  'CLICK',
  'VIEW',
  'scancode_push',
  'scancode_waitmsg',
  'pic_sysphoto',
  'pic_photo_or_album',
  'pic_weixin',
  'location_select'
]

router.post('/oauth', oauth)

router.use(
  '/*',
  wechat(global.wechatConfig)
    .text(function (message: string, req: any, res: any) {
      console.log('=== text message received ===')
      console.log(message)
      try {
        res.reply('Got your text message, test!')
      } catch (e) {
        console.error(e)
      }
    })
    .image(function (message: any, req: any, res: any) {
      console.log('=== image message received ===')
      console.log(message)
      var MediaId = message.MediaId
      var picurl = message.PicUrl
      try {
        res.reply('Got your image message, image url: ' + picurl)
      } catch (e) {
        console.error(e)
      }
    })
    .location(function (message: any, req: any, res: any) {
      console.log('=== location message received ===')
      console.log(message)

      var label = message.Label
      try {
        res.reply('Got your location message : ' + label)
      } catch (e) {
        console.error(e)
      }
    })
    .event(function (message: any, req: any, res: any) {
      console.log('=== event message received ===')
      console.log(message)

      if (message.Event === 'subscribe') {
        res.reply('Got your text message, test!')
      } else if (message.Event === 'unsubscribe') {
        res.reply('Got your text message, test!')
      } else {
        console.log('Got your event message, your event type:' + message.Event)
      }
    })
    .voice(function () {
      console.warn('voice not implemented')
    })
    .video(function () {
      console.warn('video not implemented')
    })
    .link(function () {
      console.warn('link not implemented')
    })
    .middlewarify()
)

export default router
