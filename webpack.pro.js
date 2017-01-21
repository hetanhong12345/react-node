var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
module.exports = {
    entry: {
        main:['whatwg-fetch','./index'],
        ventor:['react','react-dom','react-router','react-router-redux','redux','react-redux']
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: "[name].js",
        chunkFilename:"[name].js",
        publicPath: '/public/'
    },
    plugins: [
        new CommonsChunkPlugin({
            name:['ventor'],
            minChunks:Infinity
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    resolve: {
        alias: {
            react: path.resolve('./node_modules/react'),
            lodash: path.resolve('./node_modules/lodash')
        }
    },
    module: {
          preLoaders: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    },
  ],
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                include: __dirname
            },
            { test: /\.less$/, loader: "style!css!less"}
        ]
    }
}
