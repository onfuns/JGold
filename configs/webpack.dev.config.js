const merge = require('webpack-merge')
const path = require('path');
const baseWebpackConfig = require('./webpack.base.config')

module.exports = merge(baseWebpackConfig, {
	mode: 'development',
	devtool: 'inline-source-map',
	watch: true,
	watchOptions: {
		ignored: /node_modules/
	},
	entry: [
		'babel-polyfill',
		path.join(__dirname, '../app/src/index.js')
	],
	output: {
		path: path.join(__dirname, '../app/build'),
		filename: 'app.bundle.js',
		publicPath: './',
	}
})
