module.exports = {
  context: __dirname,
  entry: "./lib/main.js",
  output: {
    path: "./lib",
    publicPath: "/lib/",
    filename: "jquery_lite.js",
  },
};
