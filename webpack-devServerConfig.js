import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import HtmlWebpackPlugin from 'html-webpack-plugin'

const __dirname = dirname(fileURLToPath(import.meta.url))


const onlyRebuildHtmlCssAndJs = (mode) => {

  console.log(`
    Starting hot-reload dev server in ${mode} mode
  `)

  return {
    mode,
    entry: {
      main: __dirname + '/src/index.tsx',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env']
            }
          }
        },
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader"
          ]
        },
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      })
    ],
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: '[name][fullhash].js',
    },
    devServer: {
      hot: true,
      open: true,
      static: {
        directory: path.resolve(__dirname, 'dist')
      }
    },
    resolve: {
      extensions: [".js", ".jsx", ".tsx", ".ts"]
    },
  }
}


export default onlyRebuildHtmlCssAndJs