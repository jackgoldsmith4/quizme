const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      { 
        enforce: 'pre', 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'source-map-loader' }
    ]
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
        template: './public/index.html'
    })
  ]
};