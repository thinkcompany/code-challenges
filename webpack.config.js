
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html'
})
const copyPlugin = new CopyWebpackPlugin([{from: 'src/data', to: 'data'}])
const extractPlugin = new ExtractTextPlugin({filename: 'styles.css', allChunks: true})

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]_[local]__[hash:8]'
              }
            },
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: true,
                importLoaders: 2,
                localIdentName: '[name]_[local]__[hash:8]'
              }
            },
            'sass-loader'
          ]
        })
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'static/fonts/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.json$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'static/data/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [htmlPlugin, copyPlugin, extractPlugin]
}
