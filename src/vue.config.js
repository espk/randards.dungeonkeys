module.exports = {
  devServer: {
    host: 'dev.randards.com'
  },
  publicPath: process.env.NODE_ENV === 'production'
      ? '/dungeonkeys/'
      : '/'
}