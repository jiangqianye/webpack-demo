const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 已经在package里面定义了开发环境，默认热更新
// "start": "webpack serve  --mode development --env development",

module.exports = {
    mode: 'production' , //'development', // production
    entry: './src/index.js',
    // entry: {
    //     app: './src/index.js',
    //     print: './src/print.js',
    //     another:'./src/another-module.js'
    // },
    devServer: {
        contentBase: './dist',
        // hot: true  // 热更新
        // historyApiFallback: true,
        // contentBase: path.join(__dirname, './dist'),
        // open: false,
        // hot: true,
        // quiet: true,
        port: 8080,
    },
    devtool:'inline-source-map',  // 使用source map：bug定位
    optimization:{     
        runtimeChunk:'single',
        splitChunks:{  // // 为了解决多个bundle引入相同模块的问题，引入这个模块进行去重。
            cacheGroups:{
                vendor:{
                    test:/[\\/]node_modules[\\/]/,
                    name:'vendor',
                    chunks:'all'
                }
            }
        },
        usedExports:true,  // 打包时标记没用的代码 package里面 "sideEffects": false,删除没用的代码
    },
    plugins: [
        new CleanWebpackPlugin(),  // 清除dist
        new HtmlWebpackPlugin({template: './src/index.html'}),  // 打包index.html文件
    ],
    output: {
        filename:"[name].[contenthash].js", // 配合optimization生成不同的文件名，防止浏览器缓存   // '[name].bundle.js',
        chunkFilename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }
}