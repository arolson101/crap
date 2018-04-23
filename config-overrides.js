var path = require("path");

const { injectBabelPlugin } = require('react-app-rewired');
const rewireGqlTag = require('react-app-rewire-graphql-tag');

function nodeModule(mod) {
  return path.resolve(__dirname, './node_modules/' + mod)
}

const babelModules = [
  'native-base-shoutem-theme',
  'react-native-drawer',
  'react-native-easy-grid',
  'react-native-elements',
  'react-native-keyboard-aware-scroll-view',
  'react-native-safe-area-view',
  'react-native-tab-view',
  'react-native-touchable-scale',
  'react-native-vector-icons',
  'react-navigation',
  'react-router-native',
  'static-container',
]

module.exports = function override(config, env) {
  config = rewireGqlTag(config, env);
  config = injectBabelPlugin("transform-class-properties", config)
  config = injectBabelPlugin("dev-expression", config)
  config = injectBabelPlugin("transform-object-rest-spread", config)
  config = injectBabelPlugin(["transform-runtime", { "polyfill": false, "regenerator": true }], config)

  config.resolve.alias = {
    'react-native/Libraries/Renderer/shims/ReactNativePropRegistry': 'react-native-web/dist/modules/ReactNativePropRegistry/index.js',
    'react-native$': 'react-native-web',

    // 'react-router-native': 'react-router',
    // 'react-native-vector-icons/Fonts': nodeModule('react-native-vector-icons/Fonts'), // need to avoid aliasing Font dir
    // 'react-native-vector-icons': 'react-native-vector-icons/dist',

    ...config.resolve.alias,
  };

  config.module.rules.forEach(rule => {
    if (rule.oneOf) {
      rule.oneOf.forEach(one => {
        if (one.loader && one.loader.indexOf('babel-loader') !== -1) {
          one.include = [
            one.include,
            ...babelModules.map(nodeModule)
          ]
        }
      });
    }
  });

  config.resolve.extensions = config.resolve.extensions.filter(ext => ext !== '.mjs');

  return config;
}
