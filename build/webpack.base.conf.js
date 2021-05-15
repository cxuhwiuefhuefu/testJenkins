'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const { webpack } = require('webpack')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}


// 将特定的类库提前打包然后引入，不但能够极大减少打包时间，也实现了将公共代码抽离成单独文件的优化方案，可以很大程度的减少打包之后的文件体积

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
     noParse: /jquery|lodash/, // 正则表达式
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        // loader: 'babel-loader',
        use: ['cache-loader', 'happypack/loader?id=happybabel'],
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
        exclude: path.resolve(__dirname,' ./node_modules'),//排除node_modules目录下的文件
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10 * 1024,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        },
        exclude: path.resolve(__dirname,' ./node_modules'),//排除node_modules目录下的文件
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        },
        exclude: path.resolve(__dirname,' ./node_modules'),//排除node_modules目录下的文件
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        // use: ["cache-loader", "url-loader"],
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        },
        exclude: path.resolve(__dirname,' ./node_modules'),//排除node_modules目录下的文件
      },
      // 解析less
      {
        test: /\.less$/,
        // loader: "style-loader!css-loader!less-loader",
        use: ["cache-loader", "happypack/loader?id=css"],
        exclude: path.resolve(__dirname,' ./node_modules'),//排除node_modules目录下的文件
      },
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
