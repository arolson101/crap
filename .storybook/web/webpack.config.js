// module.exports = require('react-scripts-ts/config/webpack.config.dev.js');
var webpack = require("webpack");
var genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
const path = require('path');
// const fs = require("fs");

function nodeModule(mod) {
  return path.resolve(__dirname, '../../node_modules/' + mod)
}

module.exports = function (config, env) {
  var config = genDefaultConfig(config, env);

  config.target = 'web';

  config.module.rules.push({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    include: [/stories/, /src/],
    loaders: [
      'ts-loader?configFile=tsconfig.test.json'
    ]
  });

  config.module.rules.push({
    test: /\.js$/,
    loader: 'babel-loader',
    // Add every directory that needs to be compiled by Babel during the build
    include: [
      nodeModule('react-native-easy-grid'),
      nodeModule('react-native-elements'),
      nodeModule('react-native-keyboard-aware-scroll-view'),
      nodeModule('react-native-tab-view'),
      nodeModule('react-native-vector-icons'),
      nodeModule('react-navigation'),
      nodeModule('react-router-native'),
    ],
    query: {
      compact: false,
      "presets": ["env", "flow", "react"],
      "plugins": [
        "transform-class-properties",
        "dev-expression",
        "transform-object-rest-spread",
        ["transform-runtime", {
          "polyfill": false,
          "regenerator": true
        }],
      ]
    }
  })

  config.resolve.extensions.push('.tsx');
  config.resolve.extensions.push('.ts');
  config.resolve.extensions.push('.js');
  config.resolve.extensions.push('.web.js');
  config.resolve.extensions.push('.windows.js');
  // config.resolve.extensions.push('.android.js');

  config.resolve.modules = [
    path.resolve(__dirname, '..', 'src'),
    'node_modules',
  ];

  config.resolve.alias = config.resolve.alias || {}
  config.resolve.alias['react-native'] = 'react-native-web';
  // config.resolve.alias['react/lib/ReactNativePropRegistry'] = 'react-native-web/dist/modules/ReactNativePropRegistry';
  // config.resolve.alias['react-native/Libraries/Renderer/shims/ReactNativePropRegistry'] = 'react-native-web/dist/modules/ReactNativePropRegistry';

  config.plugins.push(
    // new webpack.DllReferencePlugin({
    //     context: path.resolve(__dirname, ".."),
    //     name: 'electron_dll',
    //     manifest: require("../app/dev_electron_dll.json"),
    //     sourceType: "commonsjs2"
    //   }),

    // production defines
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true,
      __TEST__: 1
    }),
  );

  config.externals = {
    'jsdom': 'window',
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
    'react/addons': true,
  };

  // config.externals = {
  //     'ws': true,
  //     'sqlite3': 'commonjs cross-sqlcipher',
  //     'pouchdb': 'commonjs pouchdb',
  //     'leveldown': 'commonjs leveldown',
  //     'leveldown/package': 'commonjs leveldown/package',
  // };

  // fs.readdirSync(path.join(__dirname, '..', 'node_modules'))
  //     .filter(function(x) {
  //         return ['.bin'].indexOf(x) === -1;
  //     })
  //     .forEach(function(mod) {
  //         config.externals[mod] = 'commonjs ' + mod;
  // });

  return config;
};
