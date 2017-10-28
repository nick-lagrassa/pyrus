const path = require('path');

module.exports =  {
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
                ],
                query: {
                    plugins: [
                        'transform-runtime',
                        'transform-class-properties',
                        'transform-object-rest-spread'
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
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};
