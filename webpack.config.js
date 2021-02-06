const path = require('path');
const fs = require('fs');
const isDev = process.env.NODE_ENV === 'development';

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const testFolder = path.resolve(__dirname, './src/entryPoints/');
const entry = {};

fs.readdirSync(testFolder).forEach(file => {
  if (file) {
    entry[file] = [
      path.resolve(__dirname, `./src/entryPoints/${file}/index.ts`),
      path.resolve(__dirname, `./src/entryPoints/${file}/index.scss`),
    ]
  }
});

const optimization = {
  /**
   * По умолчанию webpack сжимал JS, так как 5 версия имеет встроенный terser.
   * Но так как Я для CSS установил Minimizer, то мой JS перестал сжиматься.
   * Из-за этого пришлось по новой установить terser
   */
  minimize: true,
  minimizer: [
    new CssMinimizerPlugin(),
    new TerserPlugin()
  ],
}

module.exports = {
  entry: entry,
  output: {
    path: isDev ? path.resolve(__dirname, './dist/dev/') : path.resolve(__dirname, './dist/build/'),
    filename: isDev ? '[name]/dev.[name].min.js' : '[name]/build.[name].min.js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]/[name].min.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?url=false',
          'postcss-loader',
          'sass-loader'
        ],
      },
    ],
  },
  devtool: 'source-map',
  optimization: isDev ? {} : optimization,
};
