const webpack = require('webpack');
let path = require('path');
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.config')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin


const join = (name) => path.join(__dirname, name)

module.exports = merge(baseWebpackConfig, {
	mode: 'production',
	entry: {
		'app': [
			'babel-polyfill',
			join('../app/src/index.js')
		],
	},
	output: {
		path: join('../app/build'),
		filename: 'app.bundle.js',
		publicPath: './',
		chunkFilename: '[name].js'
	},
	devtool: false,
	optimization: {
		splitChunks: {
			cacheGroups: {
				default: false,
				antd: {
					test: /[\\/]node_modules[\\/](antd|@ant-design|rc-[\w]+)[\\/]/,
					name: 'antd',
					chunks: 'all',
					minChunks: 1,
					priority: 10
				},
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'all',
					minChunks: 1,
					priority: 0
				}
			},
		}
	},
	plugins: [
		//new BundleAnalyzerPlugin(),
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
		new CopyWebpackPlugin([
			{
				from: join('../main.js'),
				to: join('../app/build')
			},
			{
				from: join('../package.json'),
				to: join('../app/build')
			}
		])
	]
})
