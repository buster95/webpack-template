const webpack = require('webpack');
var htmlWebpack = require('html-webpack-plugin');
var copyWebpack = require('copy-webpack-plugin');
var path = require('path');

var enviroment = process.env.NODE_ENV || 'development';
console.log(enviroment.toUpperCase());



module.exports = [
    {
        entry: {
            'bundle': './src/app.js',
        },
        output: {
            "path": __dirname + '/build/',
            "filename": "[name].js",
            "publicPath": ""
        },
        resolve: {
            extensions: ['.js', '.css', '.html']
        },
        module: {
            rules: [
                {
                    test: /\.js?$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [
                        {
                            loader: 'babel-loader'
                        }
                    ]
                }
            ]
        },
        optimization: {
            minimize: (enviroment.toLowerCase() === 'production' ? true : false),
        },
        plugins: [
            new webpack.DefinePlugin({
                PRODUCTION: JSON.stringify(true),
                VERSION: JSON.stringify('5fa3b9'),
                BROWSER_SUPPORTS_HTML5: true,
                // 'typeof window': JSON.stringify('object'),
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                'process.env.BROWSER': JSON.stringify(true)
            }),
            new htmlWebpack({
                filename: 'index.html',
                minify: {
                    minifyCSS: true,
                    minifyJS: true,
                    minifyURLs: true,
                    useShortDoctype: true,
                    removeComments: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    collapseWhitespace: true,
                },
                hash: true,
                baseUrl: '/',
                // excludeChunks: enviroment !== 'production' ? ['bundle.min'] : ['bundle'],
                template: './src/index.html'
            }),
            new copyWebpack([
                { from: "src/assets", to: "assets/" },
                // { from: "ClientApp/manifest.json", to: "manifest.json", toType: 'file' },
                // { from: "src/favicon.png", to: "favicon.png  ", toType: 'file'},
            ], {
                copyUnmodified: true,
                flatten: true
            })
        ]
    }
];