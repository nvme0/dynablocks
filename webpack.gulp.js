import webpack from "webpack";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import FixStyleOnlyEntriesPlugin from "webpack-fix-style-only-entries";
import DependencyExtractionWebpackPlugin from "@wordpress/dependency-extraction-webpack-plugin";

const publicPath = `http://localhost:3000/wp-content/plugins/s4tw-dynablocks/dist/`;

const fontConfig = {
  test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
  loader: "file-loader"
};

const imageConfig = {
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
};

const common = PRODUCTION => ({
  devtool: !PRODUCTION ? "inline-source-map" : false,
  mode: PRODUCTION ? "production" : "development",
  watchOptions: {
    ignored: /node_modules/
  }
});

export const styles = (PRODUCTION, entry) => ({
  ...common(PRODUCTION),
  plugins: [
    new DependencyExtractionWebpackPlugin(),
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({ filename: "[name].css" })
  ],
  entry,
  output: {
    path: path.resolve(__dirname, "dist/css")
  },
  module: {
    rules: [
      imageConfig,
      fontConfig,
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  }
});

export const scripts = (PRODUCTION, entry) => ({
  ...common(PRODUCTION),
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".jsx", ".json"],
    alias: !PRODUCTION
      ? {
          "react-dom": "@hot-loader/react-dom"
        }
      : undefined
  },
  plugins: [
    new DependencyExtractionWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    minimize: PRODUCTION,
    minimizer: [new TerserPlugin({ sourceMap: !PRODUCTION })]
  },
  entry,
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath,
    hotUpdateChunkFilename: ".hot/[id].[hash].hot-update.js",
    hotUpdateMainFilename: ".hot/[hash].hot-update.json"
  },
  module: {
    rules: [
      imageConfig,
      fontConfig,
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
          plugins: [
            "react-hot-loader/babel",
            "@babel/plugin-proposal-class-properties",
            "emotion"
          ]
        }
      }
    ]
  }
});
