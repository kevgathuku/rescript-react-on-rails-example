const { generateWebpackConfig, devServer } = require('shakapacker')

// See the shakacode/shakapacker README and docs directory for advice on customizing your webpackConfig.
const webpackConfig = generateWebpackConfig()

webpackConfig.module.rules.push({
  test: /\.res$/,
  use: 'null-loader',
})

if (process.env.NODE_ENV === 'development') {
  // Add react-refresh/babel plugin to babel-loader
  const babelLoader = webpackConfig.module.rules.find(
    (rule) => rule.use && rule.use.some((u) => u.loader && u.loader.includes('babel-loader'))
  )
  if (babelLoader) {
    const loaderConfig = babelLoader.use.find(
      (u) => u.loader && u.loader.includes('babel-loader')
    )
    if (loaderConfig) {
      loaderConfig.options = loaderConfig.options || {}
      loaderConfig.options.plugins = loaderConfig.options.plugins || []
      loaderConfig.options.plugins.push('react-refresh/babel')
    }
  }

  // Add ReactRefreshWebpackPlugin
  const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
  webpackConfig.plugins.push(
    new ReactRefreshWebpackPlugin({
      overlay: {
        sockPort: devServer.port,
      },
    })
  )
}

module.exports = webpackConfig
