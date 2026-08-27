process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const webpackConfig = require('./webpackConfig');

module.exports = webpackConfig();
