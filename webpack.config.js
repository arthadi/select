module.exports = {
  mode: 'production',
  //mode: 'development',
  entry: './src/js/main.js',
  output: {
    filename: 'main.js'
  },
  plugins: [],
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  }
}