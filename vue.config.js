module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },
  // devServer: {
  //   host: '00.00.00.00', //将浏览地址的本地服务修改为本机ip地址，用来到手机上测试
  //   port: 8080,            //端口号
  // }
}
