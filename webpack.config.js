/** 
  $ pnpm add ts-loader -D
  $ pnpm add webpack webpack-cli webpack-node-externals tsconfig-paths-webpack-plugin copy-webpack-plugin write-file-webpack-plugin node-config-webpack terser-webpack-plugin clean-webpack-plugin -D
*/
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const { IgnorePlugin } = require('webpack');
const NodeConfigWebpack = require('node-config-webpack');
const configFile = 'tsconfig.json';
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const lazyImports = [
  '@fastify/static',
  '@fastify/view',
  '@nestjs/microservices',
  '@nestjs/websockets',
  'class-transformer',
  'class-validator',
];

module.exports = {
  // CUSTOMIZE HERE
  entry: ['./src/main.ts'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  devtool: 'source-map',
  optimization: {
    minimizer: [
      // new TerserPlugin({
      //   test: /\.(js|jsx|ts|tsx)$/,
      //   parallel: true,
      //   terserOptions: {
      //     format: {
      //       comments: false, // 빌드 시, comment 제거 (주석 제거)
      //     },
      //     compress: {
      //       drop_console: true, // 빌드 시, console.* 구문 코드 제거
      //     },
      //     keep_classnames: true,
      //   },
      //   extractComments: false,
      // }),
    ],
  },

  // JUST KEEP THEM
  externals: [nodeExternals()],
  mode: 'production',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile,
      }),
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    // new NodeConfigWebpack({
    //   env: true,
    // }),
    // new HandlebarsPlugin({}),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from: 'swagger.json', to: '.' },
    //     { from: '.env', to: '.' },
    //     { from: '.env.*', to: '.' },
    //   ],
    // }),
    new WriteFilePlugin(),
    new IgnorePlugin(
      {
        checkResource: (resource) => {
          if (lazyImports.some((modulo) => resource.startsWith(modulo))) {
            try {
              require.resolve(resource);
            } catch (err) {
              return true;
            }
          }
          return false;
        },
      },
      new CleanWebpackPlugin(),
    ),
  ],
};
