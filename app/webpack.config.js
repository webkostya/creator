const VueLoader = require( 'vue-loader/lib/plugin' );
const path = require( 'path' );
const { existsSync } = require( 'fs' );

const format = {
  dir: __dirname,
  name: 'index',
  ext: '.ts'
}

if ( !existsSync(path.format( format )) ) format.ext = '.js';

const main = path.format( format );

module.exports = {
  watch: true,
  mode: 'development', // production
  entry: main,
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!less-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!less-loader!sass-loader?indentedSyntax',
          }
        }
      },{
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },{
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.vue', '.json']
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'assets', 'js')
  },
  plugins: [
    new VueLoader()
  ]
}