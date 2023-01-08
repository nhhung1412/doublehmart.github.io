import { resolve as _resolve } from "path"
import { HotModuleReplacementPlugin, NoEmitOnErrorsPlugin } from 'webpack'
import BundleTracker from 'webpack-bundle-tracker'

export const context = __dirname
export const entry = [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './assets/js/index', // entry point of our app. assets/js/index.js should require other js modules and dependencies it needs
]
export const output = {
    path: _resolve('./assets/bundles/'),
    filename: "[name]-[hash].js",
    publicPath: 'http://localhost:3000/assets/bundles/', // Tell django to use this URL to load packages and not use STATIC_URL + bundle_name
}
export const plugins = [
    new HotModuleReplacementPlugin(),
    new NoEmitOnErrorsPlugin(),
    new BundleTracker({ filename: './webpack-stats.json' }),
]
export const module = {
    loaders: [
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['react-hot-loader', 'babel-loader?presets[]=react'],
        }, // to transform JSX into JS
    ],
}
export const resolve = {
    modules: ['node_modules', 'bower_components'],
    extensions: ['.js', '.jsx']
} 