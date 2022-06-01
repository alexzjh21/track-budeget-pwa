const path = require("path");
const webpack = require("webpack");
const WebpackPwaManifest = require("webpack-pwa-manifest");

const config = {
    entry: {
        index: './public/js/index.js'
    },
    output: {
        path: path.join(__dirname + "/dist"),
        filename: "[name].bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name(file) {
                                return '[path][name].[ext]';
                            },
                            publicPath(url) {
                                return url.replace('../', '/assets/');
                            }
                        }
                    },
                    {
                    loader: 'image-webpack-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new WebpackPwaManifest({
            name: "Budget Tracker",
            short_name: "Btrack",
            description: "An app to view your expense and income",
            start_url: "/",
            background_color: "#01579b",
            theme_color: "#ffffff",
            fingerprints: false,
            inject: false,
            icons: [{
                src: path.resolve("public/icons/icon-512x512.png"),
                sizes: [96, 128, 192, 256, 384, 512],
                destination: path.join("assets", "icons")
            }]
        })
    ],
    mode: 'development'
};

module.exports = config;