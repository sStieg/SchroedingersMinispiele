// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';
const CopyPlugin = require("copy-webpack-plugin");


const config = {
    entry: {
        main: './src/index.ts',  
        test: './test/index.ts', 
    },
    output: {
        filename: '[name]-build.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, 
    },

    devtool: "eval-source-map",
    devServer: {
        open: true,
        host: 'localhost',
        port: 4200,
        
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "main.html",
            template: './index.html',
            chunks: ['main'],
            hash: true
        }),
        new HtmlWebpackPlugin({
            filename: "test.html",
            template:"./test/index.html",
            chunks: ['test'],
            hash: true
        }),
        new CopyPlugin({
            patterns: [
                {from: "scss", to: "scss"},
                {from: "images", to: "images"},
                {from: "test/images", to: "images"},
            ],
          }),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
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
                use: [stylesHandler,'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [stylesHandler, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
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
