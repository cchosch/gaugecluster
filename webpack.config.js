/* eslint-disable */
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const webpack = require("webpack");

const prod = process.env.NODE_ENV === "production";

module.exports = {
    mode: prod ? "production" : "development",
    entry: "./src/index.tsx",
    devServer: {
        historyApiFallback: true,
    },
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: prod ? "/pub" : "/"
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"]
    },
    devtool: prod ? undefined : "source-map",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                resolve: {
                    extensions: [".tsx", ".ts", ".js", ".d.ts", ".json", ".css", ".scss", ".module.scss"]
                },
                use: [{
                    loader: "ts-loader",
                    options: {
                        compilerOptions: {
                            noEmit: false
                        }
                    }
                }],
            },
            {
                test: /\.(s?css)$/,
                resolve: {
                    extensions: [".scss", ".module.scss"]
                },
                exclude: /node_modules/,
                oneOf: [
                    {
                        test: /\.module\.(s?css)$/,
                        use: [
                            MiniCssExtractPlugin.loader, {
                                loader: "css-loader",
                                options: {
                                    modules: {
                                        localIdentName: `${!prod ? "[local]_" : ""}[hash:base64:5]`
                                    },
                                }
                            }, {
                                loader: "sass-loader",
                            }
                        ]
                    },
                    {
                        test: /\.(s?css)$/,
                        use: [
                            MiniCssExtractPlugin.loader, "css-loader","sass-loader"
                        ]
                    }
                ]
            }
        ]
    },
    plugins: [
        new ESLintPlugin({
            extensions: ["tsx", "ts"]
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html")
        }),
        new MiniCssExtractPlugin(),
        new webpack.ProvidePlugin({
            React: "react"
        })
    ]
}