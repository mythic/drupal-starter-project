const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");

const entries = {};
const scssFiles = glob.sync("./web/{modules,themes}/custom/**/*.scss");

scssFiles.forEach((file) => {
  entries[file] = file;
});

module.exports = {
  entry: entries,
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      filename: (chunk) => {
        const parsedPath = path.parse(chunk.chunk.name);

        return `../${parsedPath.dir}/${parsedPath.name}.css`;
      },
    }),
  ],
};
