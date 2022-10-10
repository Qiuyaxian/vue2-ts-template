const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
//
const proxyConfig = require('./proxy.config')
//
const mockConfig = require('./mock.config')
// 获取环境变量
const confEnv = process.env.VUE_APP_ENV
// 打包环境
const serveEnv = process.env.VUE_APP_CLIENT
// 是否是正式环境
const isProd = confEnv === 'prod'
// 是否是服务器环境
const isServer = serveEnv === 'server'
const useSourceMap = !(isProd && isServer)
// 是否开启代码片段分析
const useAnalyzer = process.env.use_analyzer
// 使用mock
const useMock = process.env.use_mock

function resolve(dir) {
  return path.join(__dirname, dir)
}

const devServer = {
  // 是否自动打开
  open: false,
  //
  host: 'localhost',
  // 端口
  port: 3001, // 8080,
  // 是否开启 https
  https: false,
  // 是否开启热启动
  hotOnly: false,
  //
  disableHostCheck: true
}

if (useMock) {
  devServer.proxy = proxyConfig
  devServer.before = function (app) {
    mockConfig(app)
  }
}

module.exports = {
  publicPath: './',
  outputDir: `dist/${confEnv}`,
  assetsDir: 'static',
  // webpack-dev-server 相关配置
  devServer: devServer,
  chainWebpack: (config) => {
    config.resolve.symlinks(false)
    config.devtool('source-map')
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
    // 修改 ts loader
    config.module
      .rule('ts')
      .exclude.add(resolve('/node_modules/'))
      .end()
      .use('ts-loader')
      .tap((options) => {
        // 修改他的选项
        options.happyPackMode = true
        options.transpileOnly = true
        return options
      })
      .end()
    config.module
      .rule('tsx')
      .exclude.add(resolve('/node_modules/'))
      .end()
      .use('ts-loader')
      .tap((options) => {
        // 修改他的选项
        options.happyPackMode = true
        options.transpileOnly = true
        return options
      })
      .end()
    config.performance.hints(false)
    // 代码分割
    const cacheGroups = config.optimization.get('splitChunks')
    config.optimization.splitChunks({
      cacheGroups: {
        ...(cacheGroups ? cacheGroups.cacheGroups : {}),
        vueVendors: {
          test: /[\\/]node_modules[\\/](vue|vuex|vue-router)[\\/]/,
          name: 'vue-vendors',
          chunks: 'all',
          enforce: true
        },
        elementUI: {
          test: /[\\/]node_modules[\\/](element-ui)[\\/]/,
          name: 'element-ui',
          chunks: 'all',
          enforce: true
        }
      }
    })
    return config
  },
  configureWebpack: (config) => {
    if (useAnalyzer) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          generateStatsFile: false,
          statsOptions: { source: false },
          openAnalyzer: true
        })
      )
    }
  },
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // 在多核机器下会默认开启
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  // parallel: false,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // 第三方插件配置
  pluginOptions: {},
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 启用 CSS modules for all css / pre-processor files.
    modules: false,
    // 开启 CSS source maps?
    sourceMap: useSourceMap
  }
}
