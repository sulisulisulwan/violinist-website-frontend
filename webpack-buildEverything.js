import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'

const __dirname = dirname(fileURLToPath(import.meta.url))

const buildEverythingConfig = (mode) => {


  console.log(`
    Rebuilding ENTIRE DIST folder in ${mode} mode
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
      }),
      new CopyPlugin({
        patterns: [
          // CONFIG
          {
            from: 'config/config.json',
            to: 'config.json',
            force: false
          },
          // CSS 
          {
            from: 'src/styles.css',
            to: 'styles.css',
            force: false,
          },
          // WELL KNOWN SSL CERTIFICATE
          {
            from: 'src/assets/.well-known/pki-validation/**',
            to: '.well-known/pki-validation/[name][ext]',
            force: false,
          },
          // LOOSE FILES WITHIN ASSETS
          {
            from: 'src/assets/*',
            to: '[name][ext]',
            force: false,
          },
          {
            from: 'src/assets/.htaccess',
            to: '[name][ext]',
            force: false,
          },
          // IMAGES
          {
            from: 'src/assets/images/*',
            to: 'images/[name][ext]',
            force: false,
          },
          {
            from: 'src/assets/images/audio-player-icons/*',
            to: 'images/audio-player-icons/[name][ext]',
            force: false,
          },
          {
            from: 'src/assets/images/carousel-icons/*',
            to: 'images/carousel-icons/[name][ext]',
            force: false,
          },
          {
            from: 'src/assets/images/social-icons/*',
            to: 'images/social-icons/[name][ext]',
            force: false,
          },
        ],
        options: {
          concurrency: 100,
        },
      }),
    ],
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: '[name][fullhash].js',
      chunkFilename: '[name].split.js',
      publicPath: '/',
      clean: true
    },
    resolve: {
      extensions: [".js", ".jsx", ".tsx", ".ts"]
    },
  }
}

export default buildEverythingConfig