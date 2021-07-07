const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './app.jsx',
    helper: './js/helper.js'
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  devServer: {
    compress: true,
    historyApiFallback: true,
    open: true,
    overlay: true,
    port: 4201
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: './index.html',
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].bundle.css'
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: './assets',
        to: path.resolve(__dirname, 'dist/assets')
      }]
    })
  ],
  module: {
    rules: [{
        test: /\.scss$/,
        use: [{
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              // `postcssOptions` is needed for postcss 8.x;
              // if you use postcss 7.x skip the key
              postcssOptions: {
                // postcss plugins, can be exported to postcss.config.js
                plugins: function () {
                  return [
                    require('autoprefixer')
                  ];
                }
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(jpeg|svg|jpg|png)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2)$/,
        use: ['file-loader']
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
};