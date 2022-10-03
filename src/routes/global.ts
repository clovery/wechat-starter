import wechatAPI from 'wechat-api'
import wechatOAuth from 'wechat-oauth'
import config from './config.json'
import WechatMenu from './wechat-menu.json'

var ns: any = {}

//config
ns.config = config

//wechat init
ns.wechatOAuth = new wechatOAuth(config.base.appid, config.secret)
ns.wechatAPI = new wechatAPI(config.base.appid, config.secret)

ns.fixUrl = function (url: string) {
  return config.rootServer + url
}

//get format authorize url
ns.getWeChatAuthorizeUrl = function (redirect: string, needAuth: boolean) {
  var scope = 'snsapi_base'
  if (needAuth) {
    scope = 'snsapi_userinfo'
  }
  return ns.wechatOAuth.getAuthorizeURL(ns.fixUrl(redirect), 1, scope)
}

//update menus
ns.updateMenu = function () {
  ns.wechatAPI.createMenu(WechatMenu, function (err: Error) {
    if (err) {
      console.error('createMenu failed' + err)
    } else {
      console.log('createMenu success')
    }
  })
}

export default ns
