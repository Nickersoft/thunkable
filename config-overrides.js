const { injectBabelPlugin } = require("react-app-rewired");

const rewireLess = require("react-app-rewire-less");

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ["import", { libraryName: "antd", libraryDirectory: "es", style: true }],
    config
  );

  config = rewireLess.withLoaderOptions({
    modifyVars: {
      "@btn-circle-size": "3.75rem",
      "@layout-body-background": "transparent",
      "@layout-header-background": "transparent"
    },
    javascriptEnabled: true
  })(config, env);

  return config;
};
