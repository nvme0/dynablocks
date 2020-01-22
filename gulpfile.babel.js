/* eslint-disable no-console */
import gulp, { src, dest, series } from "gulp";
import webpack from "webpack";
import yargs from "yargs";
import del from "del";
import BrowserSync from "browser-sync";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import { scripts, styles } from "./webpack.gulp";

const PRODUCTION = yargs.argv.prod;
const HMR = yargs.argv.hmr;
const browserSync = BrowserSync.create();

const blocks = [
  "banner-slider",
  "button",
  "container",
  "hero-section",
  "image-block",
  "post-carousel"
];

const stylesEntry = {
  ["frontend.build"]: [],
  ["editor.build"]: []
};

const scriptsEntry = {
  ["frontend.build"]: [],
  ["editor.build"]: []
};

blocks.forEach(block => {
  stylesEntry["frontend.build"].push(`./src/blocks/${block}/frontend.scss`);
  stylesEntry["editor.build"].push(`./src/blocks/${block}/editor.scss`);
});

if (!PRODUCTION && HMR) {
  scriptsEntry["frontend.build"].push("webpack-hot-middleware/client");
  scriptsEntry["editor.build"].push("webpack-hot-middleware/client");
  scriptsEntry["editor.build"].push("./src/blockRegistration.dev.ts");
} else {
  scriptsEntry["editor.build"].push("./src/blockRegistration.ts");
}
// TODO - render.dev.tsx for frontend.build
scriptsEntry["frontend.build"].push("./src/render.tsx");

const stylesConfig = styles(PRODUCTION, stylesEntry);
const scriptsConfig = scripts(PRODUCTION, scriptsEntry);

export const stylesBundler = webpack(stylesConfig);
export const scriptsBundler = webpack(scriptsConfig);

const bundle = config =>
  new Promise(resolve =>
    webpack(config, (error, stats) => {
      if (error) console.log("Webpack", error);
      console.log(stats.toString());
      resolve();
    })
  );

export const clean = () => del(["dist"]);
export const bootstrap = () =>
  src("node_modules/bootstrap/dist/css/bootstrap.min.css").pipe(
    dest("dist/css")
  );
export const buildStyles = () => bundle(stylesConfig);
export const buildScripts = () => bundle(scriptsConfig);
const streamStyles = () => src("dist/css/*.css").pipe(browserSync.stream());

export const build = () =>
  clean()
    .then(bootstrap())
    .then(buildStyles())
    .then(buildScripts());

export const watch = () => {
  build();
  browserSync.init({
    open: false,
    injectChanges: true,
    proxy: "http://localhost:8081",
    port: 3000,
    ghostMode: false,
    middleware: [
      webpackDevMiddleware(scriptsBundler, {
        publicPath: scriptsConfig.output.publicPath
      }),
      webpackHotMiddleware(scriptsBundler)
    ]
  });
  gulp.watch("src/**/*.scss", series(bootstrap, buildStyles, streamStyles));
};

// TODO
// - Once banner-slider HMR is working, extend to other blocks
// - support for react hooks
// - bundle warnings
// - HMR on backend (wp-admin)?
