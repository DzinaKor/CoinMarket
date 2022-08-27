const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const EslingPlugin = require("eslint-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const baseConfig = {
  entry: path.resolve(__dirname, "./src/index.ts"),
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(ico|png|svg|jpe?g|gif)$/,
        use: {
          loader: "file-loader"
        }
      },
      {
        test: /\.[tj]s$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css"
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      filename: "index.html"
    }),
    new CleanWebpackPlugin(),
    new EslingPlugin({ extensions: "ts" })
  ]
};

module.exports = ({
                    mode
                  }) => {
  const isProductionMode = mode === "prod";
  const envConfig = isProductionMode ? require("./webpack.prod.config") : require("./webpack.dev.config");

  return merge(baseConfig, envConfig);
};
