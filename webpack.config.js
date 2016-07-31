import path from 'path'
import webpack from 'webpack'

var config = {
	devtool: 'cheap-module-eval-source-map',
	entry: [
		'webpack-hot-middleware',
		'./src/client/index'
	],
	output: {
		path: path.join(__dirname, '/client/'),
		filename: 'bundle.js'
	},
	resolve: {
		root: path.join(__dirname, '/src/'),
		extensions: ["", ".js", ".jsx", '.es6'],
		alias: {
			"Base": 'client/core/Base.js',
			"utils":"common/utils/index.js"
		}
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['babel'],
			exclude: /node_modules/,
			include: __dirname
		}]
	}
	/*resolve: {
		extensions: ["", ".js", ".jsx", '.es6'],
		root: path.join(__dirname, '/src/client/')
	}*/
};
export default config;
// When inside Redux repo, prefer src to compiled version.
// You can safely delete these lines in your project.
var reduxSrc = path.join(__dirname, '..', '..', 'src');
var reduxNodeModules = path.join(__dirname, '..', '..', 'node_modules');
var fs = require('fs');
if (fs.existsSync(reduxSrc) && fs.existsSync(reduxNodeModules)) {
	// Resolve Redux to source
	module.exports.resolve = {
		alias: {
			'redux': reduxSrc
		}
	};
	// Compile Redux from source
	module.exports.module.loaders.push({
		test: /\.js$/,
		loaders: ['babel'],
		include: reduxSrc
	})
}