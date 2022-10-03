import express from 'express'
import wechat from 'wechat'
import global from './global'

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

router.post('/oauth', function (req, res) {
  console.log('go to oauth!')

  var code = req.body.code

  global.wechatOAuth.getAccessToken(code, function (err: Error, baseUserInfo: any) {
    if (err) {
      console.error(err)
      res.send(500)
      return
    } else {
      var query = { openid: baseUserInfo.data.openid }
      //var query = {openid : "oQ7SJt08meDJyOXyUwrZ3_b4FTNc"};
      global.collection.customer.find(query, function (err: Error, userData: any) {
        if (err) {
          res.status(500).send(err)
          return
        }

        var resData: any = {}

        if (userData.length > 0) {
          resData.isLogin = true
        } else {
          resData.isLogin = false
        }
        global.wechatOAuth.getUser(query, function (err: Error, wechatUserInfo: any) {
          if (err) {
            res.status(500).send(err)
            return
          }
          resData.userinfo = wechatUserInfo
          res.status(200).send(resData)
          return
        })
      })
    }
  })
})

router.use(
  '/*',
  wechat(global.config.base)
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
