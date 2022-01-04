module.exports = {
    plugins: {
        autoprefixer: {},
        "postcss-px-to-viewport": {
            viewportWidth: 375, //视窗的宽度，对应的是我们设计稿的宽度
            viewportHeight: 667, //视窗的高度，对应的是我们设计稿的高度。(也可以不配置)
            unitPrecision: 5,
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
            selectorBlackList: [], //指定不需要转换的类
            minPixelValue: 1, // 小于或等于`1`px不转换为视窗单位
            mediaQuery: false, // 允许在媒体查询中转换`px`
            exclude: [/TarBar/], //  (Array or Regexp) 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
        }
    }
}