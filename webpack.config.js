const ExtractTextPlugin         = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin      = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin   = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin            = require('terser-webpack-plugin');
const path                      = require('path');
const webpack                   = require('webpack');

module.exports = {
    watch: false,
    watchOptions: {
        aggregateTimeout: 1
    },
    entry: {
        app: [
            './node_modules/bootstrap/dist/css/bootstrap.min.css',
            './node_modules/line-awesome/dist/line-awesome/css/line-awesome.min.css',
            './node_modules/@fortawesome/fontawesome-free/css/all.min.css',
            './node_modules/jquery.growl/stylesheets/jquery.growl.css',
            './public/css/default.css',
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/bootstrap/dist/js/bootstrap.min.js',
            './node_modules/jquery.growl/javascripts/jquery.growl.js',
            './public/js/main.js'
        ],
        cms: [
            './node_modules/bootstrap/dist/css/bootstrap.min.css',
            './node_modules/line-awesome/dist/line-awesome/css/line-awesome.min.css',
            './node_modules/@fortawesome/fontawesome-free/css/all.min.css',
            './node_modules/jquery.growl/stylesheets/jquery.growl.css',
            './public/cms/css/default.css',
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/bootstrap/dist/js/bootstrap.min.js',
            './node_modules/jquery.growl/javascripts/jquery.growl.js',
            './public/cms/js/main.js'
        ]
    },
    output: {
        filename: 'dist/[name].js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'dist/',
                    }
                }]
            },
            {
                test: /\.(png|jpg|gif)(\?.*$|$)/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: 'dist/',
                    }
                }]
            },
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                },
                {
                    loader: 'expose-loader',
                    options: '$'
                }]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'dist/[name].css',
            publicPath: '../'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    optimization: {
        minimizer: [
            new TerserJSPlugin({}),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
}
