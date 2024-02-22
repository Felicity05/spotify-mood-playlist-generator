const webpack = require('webpack');
module.exports = {
    webpack: (config: { resolve: { fallback: { buffer: string; }; }; }, {isServer}: any) => {
        // Add fallback for 'buffer' module
        if (!isServer) {
            config.resolve.fallback = {
                buffer: require.resolve('buffer'),
            };
        }

        return config;
    },
};

export{}
