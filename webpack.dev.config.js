const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        open: true,
        hot: true,
        port: 8080,
        static: {
            directory: path.join(__dirname, 'public'),
        },
    },
};
