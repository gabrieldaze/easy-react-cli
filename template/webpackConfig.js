module.exports.src =
`
const { resolve, join } = require('path');
const { HotModuleReplacementPlugin, DefinePlugin } = require('webpack');

const PATH = {
  source: resolve(__dirname, 'src'),
  dist: resolve(__dirname, 'dist'),
};

module.exports = {
  cache: true,
  output: { path: PATH.dist, filename: 'bundle.js'},
  entry: { app: PATH.source },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    cache: true,
    alias: {
      // Webpack configuration to enable
      // profiling with React Devtools extension
      'react-dom$': 'react-dom/profiling',
      'scheduler/tracing': 'scheduler/tracing-profiling',
      
      // Path aliases for components
      // and pages directories
      '@components': join(PATH.source, 'components'),
      '@pages': join(PATH.source, 'pages'),
    }
  },
  module: {
    rules: [
      { test: /.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /.tsx?$/, exclude: /node_modules/, loader: 'ts-loader' },
    ],
  },
  devServer: {
    contentBase: PATH.dist,
    hot: true,
    inline: true,
    progress: true,
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
  ],
}

`;
