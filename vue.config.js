module.exports = {
  // 配置webpack的confoguer
  configureWebpack: {
    resolve: {
      // 配置路径别名
      alias: {
        assets: "@/assets",
        common: "@/common",
        network: "@/network",
        components: "@/components",
        views: "@/views",
        publicPath:
          "process.env.NODE_ENV === 'production' ? '/https://gitee.com/likethat/xiaomi-up.git/' : './'"
      }
    }
  },
  devServer: {
    port: 8888,
    open: true
  }
  // publicPath: './'
};

// const path = require('path');//引入path模块
// function resolve(dir){
//     return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
// }
// module.exports={
//     chainWebpack:(config)=>{
//         config.resolve.alias
//         .set('@',resolve('./src'))
//         .set('components',resolve('./src/components'))
//         .set('views',resolve('./src/views'))
//         .set('assets',resolve('./src/assets'))
//         //set第一个参数：设置的别名，第二个参数：设置的路径
//     }
// }
