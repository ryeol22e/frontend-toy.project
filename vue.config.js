module.exports = {
  productionSourceMap : false,
  configureWebpack : {
    mode : process.env.NODE_ENV==='local' ? 'none' : process.env.NODE_ENV,
    devtool : 'eval',
  },
  devServer : {
    port : process.env.VUE_APP_PORT
  },

}
