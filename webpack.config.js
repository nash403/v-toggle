const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const configureBabelLoader = browserlist => {
  return {
    test: /\.js$/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          [
            'env',
            {
              debug: true,
              modules: false,
              useBuiltIns: true,
              targets: {
                browsers: browserlist
              }
            }
          ]
        ]
      }
    }
  }
}

const baseConfig = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
    library: 'VToggle',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
      uglifyOptions: {
        mangle: {
          // Works around a Safari 10 bug:
          // https://github.com/mishoo/UglifyJS2/issues/1753
          safari10: true
        }
      }
    })
  ]
}

const modernConfig = Object.assign({}, baseConfig, {
  entry: {
    'v-toggle': path.resolve(__dirname, 'src', 'index.js')
  },
  module: {
    rules: [
      configureBabelLoader([
        // The last two versions of each browser, excluding versions
        // that don't support <script type="module">.
        'last 2 Chrome versions',
        'not Chrome < 60',
        'last 2 Safari versions',
        'not Safari < 10.1',
        'last 2 iOS versions',
        'not iOS < 10.3',
        'last 2 Firefox versions',
        'not Firefox < 54',
        'last 2 Edge versions',
        'not Edge < 15'
      ])
    ]
  }
})

module.exports = [modernConfig]
