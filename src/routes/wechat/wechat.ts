import express from 'express'
import { oauth } from './oauth'
import { fallback } from './fallback'

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

router.use('/*', fallback)

export default router
