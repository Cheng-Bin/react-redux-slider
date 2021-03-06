var webpack = require('webpack')
var path = require('path')

var isProduction = function() {
	return process.env.NODE_ENV === 'production'
}

var entry = './app/index.js'
var outputPath = './dist'

var plugins = []
if (isProduction()) {

	plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			test: /(\.jsx?$)/,
			compress: {
				warning: false
			}
		})
	)
}

var config = {
	target: 'web',
	cache: true,
	entry: entry,
	output: {
		path: path.join(__dirname, outputPath),
		filename: 'js/index.bundle.js',
		publicPath: isProduction() ? 'http://localhost:3000/' : 'http://localhost:3000/'
	},
	module: {
		loaders: [
		    {
		    	test: /(\.jsx?$)/,
		    	loader: 'babel',
		    	exclude: /node_modules/
		    },
		    {
		    	test: /\.scss$/,
		    	loaders: ['style', 'css', 'sass']
		    },
		    {
		    	test: /\.css/,
		    	loaders: ['style', 'css']
		    },
		    {
		    	test: /\.json$/,
		    	loader: 'json'
		    }, 
		    {
		    	test: /\.(jpe?g|png|gif|svg)$/,
		    	loader: 'url?limit=80240&name=images/[name].[ext]'
		    },
		    {
		    	test: /\.(woff2?|otf|eot|svg|ttf)$/i,
		    	loader: 'url?name=fonts/[name].[ext]'
		    },
		    {
		    	test: /\.html?$/,
		    	loader: 'url?[name].[ext]'
		    }
		]
	},
	plugins: plugins,
	resolve: {
		root: __dirname,
		extensions: ['', '.js', '.jsx']
	},
	devtool: isProduction() ? null : "source-map"
}

module.exports = config

