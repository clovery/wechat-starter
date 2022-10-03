import express from 'express'

import global from './global'

export const oauth = function (req: express.Request, res: express.Response) {
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
      /*
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
      */
    }
  })
}
