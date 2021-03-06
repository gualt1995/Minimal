const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')


module.exports = {
    mode: 'production',
    entry: './src/js/main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new FaviconsWebpackPlugin('./src/assets/favicon.svg'),
        new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/html/index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
              { from: "./src/assets/cv.pdf", to: "./" },
            ],
        }),
    ],
    module: {
        rules:[
        {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.handlebars$/, 
            loader: "handlebars-loader",
        },
        {
            test: /\.mp3$/,
            loader: 'file-loader',
        }
        ]
    }
};