const path = require('path');

module.exports = {
  entry: './frontend/src/index.js', // assuming your entry file is src/index.js
  output: {
    path: path.resolve(__dirname, 'dist'), // output directory
    filename: 'bundle.js', // name of the bundled file
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
            },
        },
    },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images',
                    },
                },
            ],
        },
    ],
},
};