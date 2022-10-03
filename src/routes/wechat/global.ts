import Wechat from '@/wechat/wechat'

// import WechatMenu from './wechat-menu.json'
const token = process.env.WECHAT_TOKEN
const wechatUrl = process.env.WECHAT_URL
const appid = process.env.WECHAT_APPID

function fixUrl(url: string): string {
  return wechatUrl + url
}

//get format authorize url
const getWeChatAuthorizeUrl = function (redirect: string, needAuth: boolean) {
  var scope = 'snsapi_base'
  if (needAuth) {
    scope = 'snsapi_userinfo'
  }
  return Wechat.oauth.getAuthorizeURL(fixUrl(redirect), 1, scope)
}

//update menus
function updateMenu(menu: any) {
  Wechat.api.createMenu(menu, function (err: Error) {
    if (err) {
      console.error('createMenu failed' + err)
    } else {
      console.log('createMenu success')
    }
  })
}

export default {
  fixUrl,
  getWeChatAuthorizeUrl,
  updateMenu,
  wechatConfig: {
    token,
    appid
    // encodingAESKey: 'encodinAESKey'
  }
}
