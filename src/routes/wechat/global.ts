import WechatAPI from 'wechat-api'
import WechatOAuth from 'wechat-oauth'
// import WechatMenu from './wechat-menu.json'

const appid = process.env.WECHAT_APPID
const appSecret = process.env.WECHAT_APPSECRET
const token = process.env.WECHAT_TOKEN
const wechatUrl = process.env.WECHAT_URL

const wechatOAuth = new WechatOAuth(appid, appSecret)

//wechat init
const wechatAPI = new WechatAPI(appid, appSecret)

function fixUrl(url: string): string {
  return wechatUrl + url
}

//get format authorize url
const getWeChatAuthorizeUrl = function (redirect: string, needAuth: boolean) {
  var scope = 'snsapi_base'
  if (needAuth) {
    scope = 'snsapi_userinfo'
  }
  return wechatOAuth.getAuthorizeURL(fixUrl(redirect), 1, scope)
}

//update menus
function updateMenu(menu: any) {
  wechatAPI.createMenu(menu, function (err: Error) {
    if (err) {
      console.error('createMenu failed' + err)
    } else {
      console.log('createMenu success')
    }
  })
}

export default {
  wechatOAuth,
  wechatAPI,
  fixUrl,
  getWeChatAuthorizeUrl,
  updateMenu,
  wechatConfig: {
    token,
    appid,
    // encodingAESKey: 'encodinAESKey'
  }
}
