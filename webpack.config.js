var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ProvidePlugin = require('webpack/lib/ProvidePlugin');

module.exports = {
  debug: true,
  entry: {
    vendor: ["babel-polyfill","jquery","slick-carousel","tether/dist/js/tether.js","bootstrap/dist/js/bootstrap.min.js"],
    vendor_angular: ["angular","angular-ui-router","angular-sanitize","angular-slick-carousel","angular-ui-mask"],
    bundle: ['./src/app.js'],
  },
  // entry: ['babel-polyfill', './src/app.js'],
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js'
  },
  devServer: {
    // This is required for webpack-dev-server. The path should
    // be an absolute path to your build destination.
    outputPath: path.join(__dirname, 'public')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Website Starter',
      template: 'src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    }),
    new ExtractTextPlugin("main.css"),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: 2
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true,
    //   mangle: false,

    // }),
    new CopyWebpackPlugin([{ from: 'src/**/*.js', to: __dirname + '/public' },
      { from: 'src/**/*.png', to: __dirname + '/public' },
      { from: 'src/**/*.svg', to: __dirname + '/public' },
      { from: 'src/**/*.json', to: __dirname + '/public' },
      { from: 'src/**/*.jpg', to: __dirname + '/public' },
      { from: 'src/**/*.mp4', to: __dirname + '/public' },
      { from: 'src/**/*.gif', to: __dirname + '/public' },
    { from: 'src/**/*.wav', to: __dirname + '/public' },
    { from: 'src/**/*.pdf', to: __dirname + '/public' }
    ]),
    new CleanWebpackPlugin(['public'], {
      root: path.resolve(__dirname),
      verbose: true,
      dry: true
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      "window.Tether": 'tether'
    })

  ],
  module: {
    loaders: [
      {
        test: /\.js$/, loader: 'babel-loader', query: {
          // https://github.com/babel/babel-loader#options
          cacheDirectory: true,
          presets: ['es2015', 'stage-2']
        }, exclude: [/node_modules/, /\.spec.js$/, /\npm\.js$/]
      },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!resolve-url!sass-loader") },
      { test: /\.html$/, loader: 'file-loader?name=[path]/[name].[ext]', exclude: /index\.html$/ },
      { test: /\.jade$/, loader: 'file-loader?name=[path]/[name].html!jade-html?pretty=true' },
      // inline base64 URLs for <=8k images, direct URLs for the rest
      { test: /\.(png|jpg|gif)$/, loader: 'file-loader?name=[path][name].[ext]' },
      { test: /\.mp4$/, loader: 'file-loader?name=[path][name].mp4' },
      { test: /\.wav/, loader: 'file-loader?name=[path][name].wav' },
      // helps to load bootstrap's css.
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?name=[path][name].[ext]'
      },
      {
        test: /\.woff2$/,
        loader: 'file-loader?name=[path][name].[ext]'
      },
      {
        test: /\.otf$/,
        loader: 'file-loader?name=[path][name].[ext]'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?name=[path][name].[ext]'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?name=[path][name].[ext]'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?name=[path][name].[ext]'
      },

    ]
  },

  devtool: 'source-map'
};
