/// <reference path="../express-env.d.ts" />
import path from 'path'
import Wechat from './wechat'

const action = process.argv[2]

if (action === 'menu.create') {
  const menu = require(path.resolve(__dirname, '../..', 'wechat-menu.json'))

  Wechat.api.createMenu(menu, function (err: Error) {
    if (err) {
      console.error('createMenu failed' + err)
    } else {
      console.log('createMenu success')
    }
  })
}
