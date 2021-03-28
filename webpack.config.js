/* eslint-disable global-require */
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

// eslint-disable-next-line no-unused-vars
const cssLoader = argv => ({
  loader: 'css-loader',
  options: {
    // modules: true,
    // camelCase: true,
    // localIdentName:
    //   argv.mode === 'development'
    //     ? '[path]__[local]--[hash:base64:5]'
    //     : '[hash]',
  },
});

const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = (env, argv) => ({
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.[hash].js',
    chunkFilename: 'bundle.[chunkhash].js',
    publicPath: ASSET_PATH,
  },
  devServer: {
    contentBase: path.join(__dirname, '/build'),
    historyApiFallback: true,
  },
  devtool: 'eval-source-map',
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
      createjs: 'createjs/builds/1.0.0/createjs.js',
      Auth: path.resolve(__dirname, 'src/auth/'),
      Components: path.resolve(__dirname, 'src/components/'),
      Containers: path.resolve(__dirname, 'src/containers/'),
      Docs: path.resolve(__dirname, 'src/docs/'),
      Helpers: path.resolve(__dirname, 'src/helpers/'),
      Rest: path.resolve(__dirname, 'src/rest/'),
      Theme: path.resolve(__dirname, 'src/theme/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              envName: argv.mode === 'development' ? 'development' : 'production',
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          'postcss-loader',
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     ident: 'postcss',
          //     parser: require('postcss-scss'),
          //     plugins: () => [postcssPresetEnv(), require('autoprefixer')],
          //   },
          // },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     ident: 'postcss',
          //     plugins: () => [postcssPresetEnv()],
          //   },
          // },
        ],
      },
      {
        test: /\.(png|jpg|gif|atlas)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[contenthash].[ext]',
            },
          },
        ],
      },
      // {
      //   test: /\.svg$/,
      //   issuer: /\.scss$/,
      //   loader: 'file-loader',
      //   options: {
      //     name: '[contenthash].[ext]',
      //   },
      // },
      {
        test: /\.svg$/,
        // issuer: /\.(js)x?$/,
        use: [
          '@svgr/webpack',
          {
            loader: 'file-loader',
            options: {
              name: '[contenthash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.pdf$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /node_modules[/\\]createjs/,
        loaders: ['imports-loader?this=>window', 'exports-loader?window.createjs'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      // favicon: './favicon.ico',
    }),
    new webpack.ProvidePlugin({
      PIXI: 'pixi.js',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      // skipWaiting: true,
      exclude: [/\.html$/],
    }),
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
    }),
    // new CopyWebpackPlugin({ patterns: [{ from: 'static' }] }),
  ],
});
