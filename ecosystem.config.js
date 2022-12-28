const path = require('path')

module.exports = {
  apps: [
    {
      namespace: 'legoit',
      name: 'wechat',
      script: path.resolve(__dirname, './dist/index.js'),
      instances: 1,
      env_production: {
        NODE_ENV: 'production',
        PORT: 4100
      }
    }
  ]
}
