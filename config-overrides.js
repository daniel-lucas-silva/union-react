const {
  override,
  addDecoratorsLegacy,
  disableEsLint,
  addBundleVisualizer,
  addWebpackAlias,
  adjustWorkbox,
  addLessLoader,
  fixBabelImports,
} = require("customize-cra");
const path = require("path");

module.exports = override(
  // enable legacy decorators babel plugin
  addDecoratorsLegacy(),

  // disable eslint in webpack
  // disableEsLint(),

  // add webpack bundle visualizer if BUNDLE_VISUALIZE flag is enabled
  process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),

  fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: false,
    },
    {
      libraryName: 'lodash',
      libraryDirectory: '',
      camel2DashComponentName: false
    }
  ),

  addLessLoader({
    javascriptEnabled: true,
  }),

  // adjust the underlying workbox
  adjustWorkbox(wb =>
    Object.assign(wb, {
      skipWaiting: true,
      exclude: (wb.exclude || []).concat("index.html")
    })
  )
);
