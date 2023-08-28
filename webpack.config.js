const path = require('path');

module.exports = {
	entry: {index:'./src/index.ts',
        // previewworker:'./src/Components/Files/File Preview/previewworker.ts'
    },
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.svg/,
				type: 'asset/inline',
			},
			{
				test: /\.png$/,
				type: 'asset/inline',
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.svg', '.png'],
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'out/src'),
	},
	cache: false,
    devtool:'source-map',
};
