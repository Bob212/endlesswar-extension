const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV = 'development';
const isProd = !isDev;

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: false,
        reloadAll: true
      }
    },
    'css-loader',
  ]

  if (extra) {
    loaders.push(extra)
  }

  return loaders
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    polyfill: '@babel/polyfill',
    content: ['./content.js'],
    // background: './background.js',
    popup: './popup.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.css']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      }
    ]
  },
  watchOptions: {
    aggregateTimeout: 200,
    ignored: [
      path.resolve(__dirname, 'node_modules/**'),
      path.resolve(__dirname, 'dist'),
      // path.resolve(__dirname, 'lib')
    ]
  }
}
