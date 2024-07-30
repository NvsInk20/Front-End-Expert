const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src/scripts/index.js'),
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            maxSize: 70000,
            minSize: 20000,
            maxAsyncRequests: 30,
            minChunks: 1,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            automaticNameDelimiter: '~',
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    plugins: [
        new CleanWebpackPlugin(),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/templates/index.html'),
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/public/'),
                    to: path.resolve(__dirname, 'dist/'),
                    globOptions: {
                        // CopyWebpackPlugin mengabaikan berkas yang berada di dalam folder images
                        ignore: ['**/images/heros/**'],
                    },
                },
            ],
        }),
        new WorkboxWebpackPlugin.GenerateSW({
            swDest: './sw.bundle.js',
            runtimeCaching: [
                {
                    urlPattern: ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/list'),
                    handler: 'StaleWhileRevalidate',
                    options: {
                        cacheName: 'therestaurantdb-api',
                    },
                },
                {
                    urlPattern: ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/images/medium/') || url.href.startsWith('https://restaurant-api.dicoding.dev/images/small/') || url.href.startsWith('https://restaurant-api.dicoding.dev/images/large/'),
                    handler: 'StaleWhileRevalidate',
                    options: {
                        cacheName: 'therestaurantdb-image-api',
                    },
                },
                {
                    urlPattern: ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/detail/'),
                    handler: 'StaleWhileRevalidate',
                    options: {
                        cacheName: 'therestaurantdb-detail-api',
                    },
                },
            ],
        }),
        new ImageminWebpackPlugin({
            plugins: [
                ImageminMozjpeg({
                    quality: 50,
                    progressive: true,
                }),
            ],
            imageminOptions: {
                plugins: [
                    ['imagemin-maximum-compress', { max: 200 }],
                ],
            },
        }),
        new BundleAnalyzerPlugin(),
    ],
};
