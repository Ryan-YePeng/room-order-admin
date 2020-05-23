const webpack = require("webpack");
const resolve = dir => require("path").join(__dirname, dir);
module.exports = {
  publicPath: "./",
  assetsDir: "static",
  lintOnSave: false,
  configureWebpack: config => {
    const plugins = [];
    plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    );
    config.plugins = [...config.plugins, ...plugins];
  },
  chainWebpack: config => {
    config.resolve.symlinks(true); // 修复HMR
    config.resolve.alias.set("@", resolve("src"));

    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/assets/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
  },
  css: {
    extract: true,
    sourceMap: false,
    loaderOptions: {
      sass: {
        prependData: '@import "./src/styles/index.scss";'
      }
    }
  },
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 8087,
    https: false,
    hotOnly: false,
    proxy: {
      "/api/": {
        // 目标:指向网络地址
        target: "http://112.74.86.165:8082",
        // webpack属性，映射一个host
        changeOrigin: true,
        pathRewrite: {
          "^/api/": ""
        }
      }
    }
  }
};
