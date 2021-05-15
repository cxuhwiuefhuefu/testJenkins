'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const HappyPack = require('happypack');
const { cachedDataVersionTag } = require('v8')
const happypack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({size: 5}); // 构建共享进程池 包括5个进程

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const { Stats } = require('webpack')

// var Dashboard = require('webpack-dashboard');
// var DashboardPlugin = require('webpack-dashboard/plugin');
// var dashboard = new Dashboard();

// CSS-tranking 
// const CssTreeShakingPlugin = require("webpack-css-treeshaking-plugin")
var PurifyCss = require('purifycss-webpack'); // 引入PurifyCss
var glob = require('glob-all');// 引入glob-all


const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
      //   new DashboardPlugin(dashboard.setData),
      new BundleAnalyzerPlugin({
          analyzerMode: "server",
          analyzerHost: "127.0.0.1",
          analyzerPort: 8866,
          reportFilename: "report.html",
          defaultSizes: "parsed",
          openAnalyzer: true,
          generateStatsFile: false,
          statsFilename: "stats.json",
          statsOptions: null,
          logLevel: "info"
      }),
    // happypack并行处理
    new HappyPack({
        // 用id来标识 happypack处理哪类文件
        id: 'happybabel',
        loaders: [{
            loader: 'babel-loader?cacheDirectory=true'
        }],
        // 共享进程池
        threadPool: happyThreadPool,
        // 允许happyPack输出日志
        verbose: true
    }),
    // happypack并行处理
    new HappyPack({
        // 用id来标识 happypack处理哪类文件
        id: 'css',
        loaders: [
            {loader: 'css-loader'}, 
            {loader: 'less-loader'}, 
            {loader: 'style-loader'}],
        // 共享进程池
        threadPool: happyThreadPool,
        // 允许happyPack输出日志
        verbose: true
    }),
    new UglifyJsPlugin({
        uglifyOptions: {
        ie8: false,
        ecma: 8,
        mangle: {
            properties: {
            // mangle property options
            }
        },
        output: {
            comments: false,
            beautify: false,
        },
        warnings: false
        }
    }),
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',   // 设置缓存路径，不改动的调用缓存，第二次及后面build时提速
      uglifyJS:{
        output: {
          comments: false
        },
        warnings: false
      }
    }),

    new webpack.DllReferencePlugin({
        conetxt: __dirname,
        manifest: require('../main-manifest.json')
    }),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      allChunks: true,
    }),        
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    
    // 自动提取所有的node_module或者引用次数两次以上的模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor2',
      minChunks (module, count) {
        (module.context && module.context.indexOf('node_modules') !== -1) || count >= 2;
      }
    }),
    // 按需加载的异步模块里的通用模块
    new webpack.optimize.CommonsChunkPlugin({
        name: ["main", "preview", "EditPage", "MinePage"],
        async: "async-common",
        minChunks: 2
    }),


    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),

    // 清楚无用的CSS代码
    new PurifyCss({
        paths: glob.sync([ // 传入多文件路径
            path.join(__dirname, '../src/page/*.vue'),
        ])
    }),  

  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
