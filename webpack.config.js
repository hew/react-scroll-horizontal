const path = require("path");
const extractCSS = require("extract-text-webpack-plugin");
const BabiliPlugin = require("babili-webpack-plugin");

const plugins = [
  new extractCSS({
    filename: "./bundle.css",
    allChunks: true
  })
];

module.exports = function webpackStuff(env) {
  if (env === "production") plugins.push(new BabiliPlugin());

  return {
    entry: ["./docs/entry.js"],
    output: {
      filename: "bundle.js",
      publicPath: "/docs/",
      path: __dirname + "/docs"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [{ loader: "babel-loader" }],
          include: [path.resolve(__dirname, "./")]
        },
        {
          test: /\.css$/,
          use: extractCSS.extract([ 'css-loader', 'postcss-loader' ])
        },
      ]
    },
    plugins
  };
};
