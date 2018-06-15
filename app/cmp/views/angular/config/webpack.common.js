const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const helpers = require('./helpers');

module.exports = {
	entry: './src/index.ts',
	target: 'web',
  
	resolve: {
		extensions: ['.js', '.ts', '.html']
	},
	
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					chunks: 'initial',
					name: 'vendor',
					test: 'vendor',
					enforce: true
				},
			}
		},
		runtimeChunk: true
	},

  module: {
		rules: [
			{
				test: /.js$/,
				parser: { system: true }
			},
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				loader: 'ts-loader'
			},
			{
				test: /index.html$/i,
				use: [
					{
						loader: 'html-loader',
						options: {
							name: '[name].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [		
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src'),
      {}
    ),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
	],
};