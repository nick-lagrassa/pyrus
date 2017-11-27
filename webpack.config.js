const path = require('path');
const Dotenv = require('dotenv-webpack');
const ip = require('ip');

module.exports = function(env) {
    const dotenv = new Dotenv();

    if (env.study) {
        // this is extremely hacky but needs to happen because otherwise the ip
        // address gets treated as a number for some reason??
        dotenv.definitions['process.env.APP_BACKEND'] = "'" + ip.address() + "'";
    }

    return {
        entry: ['babel-polyfill', './src/js/index.js'],
        output: {
            path: path.join(__dirname, 'public'),
            filename: 'bundle.js'
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    include: [
                        path.resolve(__dirname, 'src'),
                        path.resolve(__dirname, 'game'),
                    ],
                    query: {
                        plugins: [
                            "transform-es2015-destructuring",
                            "transform-es2015-parameters",
                            "transform-object-rest-spread",
                            "transform-es2015-arrow-functions",
                            'transform-runtime',
                            'transform-class-properties',
                        ],
                        presets: ['env', 'react'],
                    }
                },
                {
                    test: /\.json$/, 
                    loader: 'json-loader' 
                }
            ]
        },
        resolve: {
            extensions: ['.webpack.js', '.web.js', '.js']
        },
        plugins: [
            dotenv
        ],
        node: {
            console: true,
            fs: 'empty',
            net: 'empty',
            tls: 'empty'
        },
        devtool: "source-map",
    };
};
