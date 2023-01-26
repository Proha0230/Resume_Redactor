const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/Resume_Redactor/'   // calc_invest - название нашей папки с проектом и\или директории на GitHub
    : '/'
})