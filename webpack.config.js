
const HtmlWebPackPlugin = require('html-webpack-plugin')

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html'
})

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
        test: /\.sass$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          {
            // translates CSS into CommonJS
            loader: 'css-loader',
            options: {
              importLoaders: 2 // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
            }
          },
          'postcss-loader', // adds vendor prefixes
          'sass-loader' // compiles Sass to CSS, using Node Sass by default
        ]
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
        test: /\.(json)$/i,
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
  plugins: [htmlPlugin]
}