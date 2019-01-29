module.exports = {
  chainWebpack: (webpack) => {
    webpack.module
      .rule('html')
      .test(/\.html$/)
      .use('raw-loader')
        .loader('raw-loader')
        .end()
  }
}
