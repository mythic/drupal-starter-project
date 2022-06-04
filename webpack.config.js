const path = require("path");
const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");

const entries = {};
const buildTargets = [process.env.BUILD_TARGET ?? null];
const scssFiles = buildTargets.some(item => [null, 'scss'].includes(item))
  ? glob.sync("./web/{modules,themes}/custom/**/!(_)*.scss")
  : [];
const es6Files = buildTargets.some(item => [null, 'js'].includes(item))
  ? glob.sync("./web/{modules,themes}/custom/**/*.es6.js")
  : [];
const files = [...scssFiles, ...es6Files];
files.forEach((file) => {
  entries[file] = file;
});

module.exports = {
  entry: entries,
  externals: {
    jQuery: "jQuery",
    Drupal: "Drupal",
    drupalSettings: "drupalSettings",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          "sass-loader",
          "glob-import-loader",
        ],
      },
      {
        test: /\.es6.js$/,
        use: [
          "babel-loader",
          {
            loader: "file-loader",
            options: {
              outputPath(url, resourcePath, context) {
                const parsedPath = path.parse(
                  path.relative(context, resourcePath)
                );
                const filename = path.parse(parsedPath.name).name;

                return `../${parsedPath.dir}/${filename}.js`
              },
            },
          },
        ],
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename(chunk) {
        const parsedPath = path.parse(chunk.chunk.name);

        return `../${parsedPath.dir}/${parsedPath.name}.css`;
      },
    }),
    new RemoveEmptyScriptsPlugin(),
  ],
};
