const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

const config = {
  entry: {
    main: './src/index.ts',
    test: './test/index.ts',
    'login-lobby': './login-lobby/login-lobby.js',
    'login-user': './login-user/login-user.js',
  },
  output: {
    filename: '[name]-build.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  devtool: 'eval-source-map',
  devServer: {
    open: '/login-lobby.html',
    host: 'localhost',
    port: 4200,
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'main.html',
      template: './index.html',
      chunks: ['main'],
      hash: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'test.html',
      template: './test/index.html',
      chunks: ['test'],
      hash: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'login-lobby.html',
      template: './login-lobby/login-lobby.html',
      chunks: ['login-lobby'],
      hash: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'login-user.html',
      template: './login-user/login-user.html',
      chunks: ['login-user'],
      hash: true,
    }),
    new HtmlWebpackPlugin({
      filename: "how-to-play.html",
      template: "./frontendIF/src/pages/how-to-play.html",
    }),
    new HtmlWebpackPlugin({
      filename: "about-us.html",
      template: "./frontendIF/src/pages/about-us.html",
    }),
    new CopyPlugin({
      patterns: [
        { from: 'scss', to: 'scss' },
        { from: 'images', to: 'images' },
        { from: 'test/images', to: 'images' },
        { from: 'frontendIF/src/images', to: 'images'}
      ],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, 'css-loader', 'sass-loader'],
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';
    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = 'development';
  }
  return config;
};
