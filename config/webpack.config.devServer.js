'use strict';

const paths = require('./paths');

const host = 'piecent.com';
const port = '5070';

const apiProxy = "http://piecent.com:5050";

module.exports = {
    compress: true,
    contentBase: paths.appPublic,
    watchContentBase: true,
    historyApiFallback: true,
    hot: true,
    publicPath: '/',
    quiet: true,
    watchOptions: {
        ignored: /node_modules/,
    },
    // proxy all api requests to testserver:5050
    proxy: {
        "/api/**": {
            target: apiProxy,
            changeOrigin: true,
            cookieDomainRewrite: {
                "*": ""
            }
        }
    },
    host: host,
    port: port
};
