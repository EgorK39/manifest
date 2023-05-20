const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require("copy-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");


module.exports = {
    entry: {
        main: path.resolve(__dirname, "./src/index.js"),
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin(
            {template: "./src/index.html"}),
        new Dotenv(),
        new CopyPlugin({
            patterns: [
                {from: "./src/manifest.json", to: ""},
                {from: "./src/icons/logo192.png", to: "icons"},

            ],
        }),
        new WorkboxWebpackPlugin.InjectManifest({
            swSrc: './src/sw.js',
            swDest: 'sw.js',
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: path.join(__dirname, "./node_modules/"),
                use: {
                    loader: "babel-loader"
                }

            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            }, {
                test: /\.ttf$/,
                type: "asset/inline",
                use: {
                    loader: "url-loader"
                }
            },
            {
                test: /\.js$/,
                enforce: "pre",
                use: ["source-map-loader"],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: "asset/resource",
            },
        ]
    }
}