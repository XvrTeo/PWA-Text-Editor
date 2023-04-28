const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// Add and configure workbox plugins for a service worker and manifest file.

const serviceWorkerPlugin = new InjectManifest({
  swSrc: './src-sw.js',
  swDest: 'src-sw.js',
});

const manifestPlugin = new WebpackPwaManifest({
  fingerprints: false,
  inject: true,
  name: 'J.A.T.E.',
  short_name: 'J.A.T.E.',
  description: 'Just Another Text Editor',
  display: "standalone",
  start_url: './',
  publicPath: './',
  icons: [
    {
      src: path.resolve('src/images/logo.png'),
      sizes: [96, 128, 192, 256, 384, 512],
      destination: path.join('assets', 'icons'),
    },
  ],
});

// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [

      // Add the HTML Webpack Plugin to generate an index.html file

      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'J.A.T.E'
      }),

      // Generates the service worker file via serviceWorkerPlugin

      serviceWorkerPlugin,

      // Generates the manifest file via manifestPlugin

      manifestPlugin,

    ],

    module: {
      rules: [
        // Add the CSS loaders
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        // Add the Babel loader
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
