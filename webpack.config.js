const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const DependencyExtractionWebpackPlugin = require("@wordpress/dependency-extraction-webpack-plugin");

const blocks = [
  "banner-slider",
  "button",
  "container",
  "hero-section",
  "image-block",
  "post-carousel"
];

const styles = [
  ...blocks.map(function(blocks) {
    return `./src/blocks/${blocks}/style.scss`;
  }),
  "./node_modules/bootstrap/dist/css/bootstrap.min.css"
];

module.exports = {
  entry: {
    "editor.build": blocks.map(function(block) {
      return `./src/blocks/${block}/editor.tsx`;
    }),
    "frontend.build": blocks.map(function(block) {
      return `./src/blocks/${block}/frontend.tsx`;
    }),
    "style.build": styles
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".jsx", ".json"]
  },
  plugins: [
    new DependencyExtractionWebpackPlugin(),
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({ filename: "[name].css" })
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ sourceMap: true })]
  },
  mode: "development",
  devtool: "source-map",
  watchOptions: {
    // aggregateTimeout: 500,
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              { targets: { browsers: ["last 2 versions"] } }
            ],
            [
              "@babel/preset-react",
              { targets: { browsers: ["last 2 versions"] } }
            ],
            "@babel/preset-typescript"
          ],
          plugins: ["@babel/plugin-proposal-class-properties"]
        }
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /bootstrap.min.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true // webpack@2.x and newer
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: "file-loader"
      }
    ]
  }
};
