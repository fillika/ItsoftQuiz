const path = require('path');
const fs = require('fs');
const isDev = process.env.NODE_ENV === 'development';

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

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

module.exports = {
  entry: entry,
  output: {
    path: isDev ? path.resolve(__dirname, './dist/dev/') : path.resolve(__dirname, './dist/build/'),
    filename: isDev ? '[name]/dev.[name].min.js' : '[name]/build.[name].min.js',
    pathinfo: false
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin({
      dry: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name]/[name].min.css',
    }),
    new ForkTsCheckerWebpackPlugin()
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
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
            },
          },
        ],
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
  devtool: isDev ? 'source-map' : false,
  optimization: {
    minimize: isDev ? false : true,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ],
  }
};
