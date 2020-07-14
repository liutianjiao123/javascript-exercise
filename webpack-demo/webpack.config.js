const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');


module.exports = {
    mode: 'production',
    entry: './src/index.js',

    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        // new ManifestPlugin(),
        new CleanWebpackPlugin.CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "Output Management"
        }),
        new webpack.NamedChunksPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    optimization: {
        splitChunks: {
            name: 'common'
        }
    },
    output: {
        filename: 'bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    }
};
