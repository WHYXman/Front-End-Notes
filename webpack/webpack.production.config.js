const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
//
module.exports = {
	entry: __dirname + "/app/main.js", //已多次提及的唯一入口文件
	output: {
		path: __dirname + "/build",
		filename: "bundle-[hash].js"
	},
	devtool:'eval-source-map',
	devServer: {
		contentBase: "./build",
		historyApiFallback: true,
		inline: true,
		hot: true
	},
	module: {
		rules:[{
			test: /(\.jsx|\.js)$/,
			use: {
				loader:"babel-loader"
			},
			exclude: /node_modules/
		},{
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback:"style-loader",
				use: [{
					loader:"css-loader",
					options: {
						modules:true
					}
				},{
					loader:"postcss-loader"
				}],
			})
		}]
	},
	plugins: [
		new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("style.css"),
        new CleanWebpackPlugin(
            ['build/bundle*.js',],　 //匹配删除的文件
            {
                root: __dirname,       　　　　　　　　　　//根目录
                verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
                dry:      false        　　　　　　　　　　//启用删除文件
            }
        )
	]
}