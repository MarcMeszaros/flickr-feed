var path = require('path');
var webpack = require('webpack');
var AutoPrefixerPlugin = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    cache: true,
    entry: {
        app: './app/app.js',
        vendors: './app/vendors.js',
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '',
        filename: '[name].full.js'
    },
    module: {
        rules: [
            {test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'file-loader?name=fonts/[name].[ext]'},
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015'},
            {test: /\.vue$/, loader: 'vue-loader', options: {
                loaders: {
                    less: ExtractTextPlugin.extract({
                        loader: 'less-loader',
                        fallbackLoader: 'vue-style-loader'
                    }),
                    js: 'babel-loader?presets[]=es2015',
                }
            }},
            {test: /\.css$/, loader: ExtractTextPlugin.extract({
                loader: 'css-loader'
            })},
            {test: /\.less$/, loader: ExtractTextPlugin.extract({
                loader: 'css-loader!less-loader'
            })},
            {test: /\.(ico)$/, loader: 'file-loader', options: {name: '[name].ico'}},
            {test: /\.(png|jpg|gif|svg)$/, loader: 'url-loader', options: {limit: 8192, name: 'images/[name].[ext]'}},
            {test: /\.html$/, loader: 'html-loader'},
            {test: /index\.html$/, loader: 'file-loader', options: {name: 'index.html'}},
        ]
    },
    resolve: {
        alias: {
           'vue$': 'vue/dist/vue.common.js'
        }
    },
    plugins: [
        // new AutoPrefixerPlugin({
        //     browsers: ['last 4 versions']
        // }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV || '"production"'),
            }
        }),
        new ExtractTextPlugin({
            filename: '[name].full.css',
            disable: false,
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        })
    ]
};
