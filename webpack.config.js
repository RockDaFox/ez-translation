const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.js',
    },
    output: {
        path: path.resolve('dist'),
        filename: '[name].js',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: [
                    /(node_modules)/,
                    path.resolve(__dirname, 'src/cli')
                ],
                use: 'babel-loader',
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
    resolve: {
        extensions: ['.js'],
    },
};
