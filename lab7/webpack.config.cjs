const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  module: {
  rules: [
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.(png|jpe?g|gif|svg)$/i,  // для всіх популярних форматів зображень
      type: 'asset/resource',            // автоматично збереже в папку dist/assets
    },
  ],
},
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'My App',
      filename: 'index.html',
      template: path.resolve(__dirname, './src/pages/index.html'),
    }),
  ],
};