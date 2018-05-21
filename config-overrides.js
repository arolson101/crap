const path = require("path");
const webpack = require("webpack");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const { injectBabelPlugin } = require('react-app-rewired');
const rewireGqlTag = require('react-app-rewire-graphql-tag');
const rewireTypescript = require('react-app-rewire-typescript');
const getTransformer = require('ts-transform-graphql-tag').getTransformer;
const rewireReactHotLoader = require('react-app-rewire-hot-loader');

function nodeModule(mod) {
  return path.resolve(__dirname, './node_modules/' + mod)
}

const babelModules = [
  'glamorous-native',
  'native-base-shoutem-theme',
  'react-native-drawer',
  'react-native-easy-grid',
  'react-native-keyboard-aware-scroll-view',
  'react-native-safe-area-view',
  'react-native-tab-view',
  'react-native-touchable-scale',
  'react-native-vector-icons',
  'react-navigation',
  'react-router-native',
  'static-container',
  // 'type-graphql',
]

// const unusedDbDrivers = /^(mongodb|mysql|mysql2|oracledb|pg|pg\-native|pg\-query-stream|redis|mssql)$/

module.exports = function override(config, env) {

  config.resolve.extensions = [
    '.web.ts',
    '.web.tsx',
    ...config.resolve.extensions,
  ]

  config = injectBabelPlugin("react-hot-loader/babel", config)
  config = rewireTypescript(config, env);
  config = rewireGqlTag(config, env);
  config = injectBabelPlugin("transform-class-properties", config)
  config = injectBabelPlugin("dev-expression", config)
  config = injectBabelPlugin("transform-object-rest-spread", config)
  config = injectBabelPlugin(["transform-runtime", { "polyfill": false, "regenerator": true }], config)
  config = rewireReactHotLoader(config, env);

  config.resolve.alias = {
    'react-native/Libraries/Text/TextStylePropTypes': 'react-native-web/dist/exports/Text/TextStylePropTypes.js',
    'react-native/Libraries/Components/View/ViewStylePropTypes': 'react-native-web/dist/exports/View/ViewStylePropTypes.js',
    'react-native/Libraries/Renderer/shims/ReactNativePropRegistry': 'react-native-web/dist/modules/ReactNativePropRegistry/index.js',
    'react-native$': 'react-native-web',

    // 'react-router-native': 'react-router',
    // 'react-native-vector-icons/Fonts': nodeModule('react-native-vector-icons/Fonts'), // need to avoid aliasing Font dir
    // 'react-native-vector-icons': 'react-native-vector-icons/dist',

    ...config.resolve.alias,
  };

  let foundBabel = false;
  const ruleSearcher = (rule) => {
    if (rule.oneOf) {
      rule.oneOf.forEach(ruleSearcher);
    }
    if (rule.use) {
      rule.use.forEach(ruleSearcher);
    }

    if (!foundBabel && rule.loader && rule.loader.indexOf('babel-loader') !== -1) {
      foundBabel = true;
      rule.include = [
        ...(rule.include ? (Array.isArray(rule.include) ? rule.include : [rule.include]) : []),
        ...babelModules.map(nodeModule)
      ]
    }

    if (rule.loader && rule.loader.indexOf('ts-loader') !== -1) {
      rule.options = {
        ...(rule.options || {}),
        getCustomTransformers: () => ({ before: [getTransformer()] })
      }
    }
  }

  config.module.rules.forEach(ruleSearcher);

  const pluginsWithoutUglify = config.plugins.filter(plugin => !(plugin.options && plugin.options.compress))
  const addUglify = (pluginsWithoutUglify.length !== config.plugins.length)

  config.plugins = [
    ...pluginsWithoutUglify,

    // new webpack.IgnorePlugin(unusedDbDrivers),
    // new webpack.NormalModuleReplacementPlugin(/typeorm$/, function (result) {
    //   result.request = result.request.replace(/typeorm/, "typeorm/browser");
    // }),
    // new webpack.ProvidePlugin({
    //   'window.SQL': 'sql.js/js/sql.js'
    // })
  ]

  if (addUglify) {
    config.plugins.push(
      new UglifyJSPlugin({
        parallel: true,
        uglifyOptions: {
          ie8: false,
          ecma: 6,
          warnings: true,
          mangle: false,
          output: {
            comments: false,
            beautify: false,  // debug true
          }
        },
        sourceMap: true,
      })
    )
   }

  // console.log(JSON.stringify(config, null, '  '));

  return config;
}
