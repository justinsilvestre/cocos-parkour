var path = require('path');

module.exports = {
  entry: ['./js/game.js'],
  output: {
    path: path.join(__dirname, 'src'),
    filename: 'app.js',
    libraryTarget: 'var',
    library: 'game'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: path.join(__dirname, 'js'),
        query: {
          plugins: ['transform-runtime'],
        }
    }]
  },
  externals: { cc: 'cc' }
};
