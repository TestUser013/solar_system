const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    // mode: 'development',
    devServer: {
        contentBase: __dirname,
        compress: true,
        port: 9000,
        historyApiFallback: {
            index: 'index.htm'
        }
    },
    entry: {
        'scripts/solar-system.js': "./src/scripts/app.ts",
        'tmp/solar-system.css': './src/styles/main.scss'
    },
    // devtool: 'inline-source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/main.css',
        }),
    ],
    output: {
        path: __dirname + '/',
        filename: "[name]"
    },
    resolve: {
        extensions: [".ts", ".js", ".css", ".scss"]
    },
    watchOptions: {
        ignored: ["node_modules/**"],
    },
    module: {
        rules: [{
            test: /\.ts$/,
            loader: "ts-loader",
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            exclude: /(node_modules|bower_components)/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
            ],
        }]
    }
};
