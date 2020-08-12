module.exports = (config) => {
  config.module.rules.find((rule) => {
    if (rule && rule.test && rule.test.test(".css")) {
      rule.use = ["style-loader", "postcss-loader"];
    }
  });

  // Remove browser aliases so that we always get node.js versions of modules:
  config.resolve.aliasFields = [];

  config.externals = ["react", "react-dom"];

  return config;
};
