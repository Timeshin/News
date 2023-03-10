const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@/styles': path.resolve(__dirname, 'src/styles/'),
      '@/components': path.resolve(__dirname, 'src/components/'),
      '@/config': path.resolve(__dirname, 'src/config/'),
      '@/pages': path.resolve(__dirname, 'src/pages/'),
      '@/modules': path.resolve(__dirname, 'src/modules/')
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts)x?$/,
          exclude: /node_modules|\.d\.ts$/,
          use: {
            loader: 'ts-loader',
            options: {
            compilerOptions: {
            noEmit: false,
           },
          },
        }
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new Dotenv({
      path: `.env.${process.env.NODE_ENV}`
    })
  ],
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
  },
}