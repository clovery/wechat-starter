# wechat-starter

微信公众平台示例项目

## 使用

拷贝 .env.example 为 .env，替换成你申请的公众号的配置信息。

```
git clone https://github.com/clovery/wechat-starter.git
cd wechat-starter
npm install
npm start
```

在微信后台开发者模式中填写正确的回调URL：[rootServer]/wechat

## 测试号

申请测试号
https://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index

## 问题

### 客服接口 - 发消息

https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=ACCESS_TOKEN

```txt
"errcode":45015,"errmsg":"response out of time limit or subscription is canceled。
```
导致上面报错的原因是用户会话超时，这时需要使用 “模板消息接口” 推送信息给用户。

## 资料

- [微信官方文档-公众号](https://developers.weixin.qq.com/doc/offiaccount/Getting_Started/Overview.html)
