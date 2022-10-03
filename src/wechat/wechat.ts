import WechatAPI from 'wechat-api'
import WechatOAuth from 'wechat-oauth'

const appid = process.env.WECHAT_APPID
const appSecret = process.env.WECHAT_APPSECRET

export const wechatOAuth = new WechatOAuth(appid, appSecret)

//wechat init
export const wechatAPI = new WechatAPI(appid, appSecret)

export default {
  oauth: wechatOAuth,
  api: wechatAPI
}
