const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: isProduction ? "production" : "development",
    entry: {
      main: "./frontendIF/src/js/script.js",
    },
    output: {
      filename: "[name]-build.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
      publicPath: "/",
    },
    devtool: isProduction ? "source-map" : "eval-source-map",
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      watchFiles: ["frontendIF/src/**/*"],
      open: "/login-lobby.html",
      host: "localhost",
      port: 4200,
      hot: true,
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "login-lobby.html",
        template: "./login-lobby/login-lobby.html",
      }),
      new HtmlWebpackPlugin({
        filename: "how-to-play.html",
        template: "./frontendIF/src/pages/how-to-play.html",
      }),
      new HtmlWebpackPlugin({
        filename: "about-us.html",
        template: "./frontendIF/src/pages/about-us.html",
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
      }),
      new CopyPlugin({
        patterns: [
          { from: "frontendIF/src/css", to: "css" },
          { from: "frontendIF/src/js", to: "js" },
          { from: "frontendIF/src/pages/navbar.html", to: "navbar.html" },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".js"],
    },
    performance: {
      maxAssetSize: 300000, 
      maxEntrypointSize: 300000, 
      hints: isProduction ? "warning" : false, 
    },
  };
};
