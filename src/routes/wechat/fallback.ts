import wechat from 'wechat'
import global from './global'

export const fallback = wechat(global.wechatConfig)
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
  .event(event)
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

type EventMessage = {
  ToUserName: string
  FromUserName: string
  CreateTime: string
  MsgType: string
  Event: 'subscribe'
  EventKey: string
}

function event(message: EventMessage, req: any, res: any) {
  console.log('=== event message received ===')
  console.log(message)


  if (message.Event === 'subscribe') {
    res.reply('Got your text message, test!')
  } else if (message.Event === 'unsubscribe') {
    res.reply('Got your text message, test!')
  } else {
    console.log('Got your event message, your event type:' + message.Event)
  }
}
