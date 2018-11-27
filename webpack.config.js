const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require('webpack-merge');
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default
const argv = require('yargs-parser')(process.argv.slice(2))
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const _mode = argv.mode || "development"
const _modeflag = _mode === 'production' ? true : false

const _mergeConfig = require(`./config/webpack.${_mode}.js`)

const webpackConfig = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: { transpileOnly: true, appendTsSuffixTo: [/.vue$/] },
        exclude: /node_modules/
      }
    ]
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         chunks: "initial",
  //         name: "common",
  //         minChunks: 1,
  //         maxInitialRequests: 5,
  //         minSize: 0
  //       }
  //     }
  //   },
  //   runtimeChunk: {
  //     name: "runtime"
  //   }
  // },
  devServer: {
    // port: 3000,
    // hot: true,
    before(app) {
      app.get("/api/test", (req, res) => {
        res.json({
          code: 200,
          message: "Hello"
        })
      })
    }
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.vue']
    // alias: {
    //   'vue$': 'vue/dist/vue.esm.js' // 用 webpack 1 时需用 'vue/dist/vue.common.js'
    // }
  },
  plugins: [
    new VueLoaderPlugin(),
    // new WebpackDeepScopeAnalysisPlugin(),
    new CleanWebpackPlugin(['dist']),//清理
    new HtmlWebpackPlugin({ //输出html
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new MiniCssExtractPlugin({ //输出的css文件(css tree shaking)
      filename: _modeflag ? "styles/[name].[hash:5].css" : "styles/[name].css",
      chunkFilename: _modeflag ? "styles/[id].[hash:5].css" : "styles/[id].css"
    })
  ]
};

module.exports = merge(_mergeConfig, webpackConfig)