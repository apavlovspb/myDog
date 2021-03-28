// const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  syntax: 'postcss-scss',
  parser: 'postcss-scss',
  // eslint-disable-next-line global-require
  plugins: [require('postcss-preset-env'), require('autoprefixer')],
};
