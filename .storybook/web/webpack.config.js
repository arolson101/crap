// module.exports = require('react-scripts-ts/config/webpack.config.dev.js');
var webpack = require("webpack");
const path = require('path');
// const fs = require("fs");

function nodeModule(mod) {
  return path.resolve(__dirname, '../../node_modules/' + mod)
}

// var getTransformer = require('ts-transform-graphql-tag').getTransformer
var FixDefaultImportPlugin = require('webpack-fix-default-import-plugin');


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
]

const babelLoader = {
  loader: 'babel-loader',
  query: {
    compact: false,
    "presets": ["env", "flow", "react"],
    "plugins": [
      // "babel-plugin-inline-import-graphql-ast",
      "transform-class-properties",
      "dev-expression",
      "transform-object-rest-spread",
      ["transform-runtime", {
        "polyfill": false,
        "regenerator": true
      }],
    ]
  }
}

module.exports = function (baseConfig, env, config) {
  config.target = 'web';

  config.module.rules.push({
    test: /\.(graphql|gql)$/,
    exclude: /node_modules/,
    loader: 'graphql-tag/loader'
  });

  config.module.rules.push({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    include: [/stories/, /src/],
    use: [
      babelLoader,
      {
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.test.json',
          // getCustomTransformers: () => ({ before: [getTransformer()] }),
        }
      }
    ]
  });

  config.module.rules.push({
    test: /\.js$/,
    // Add every directory that needs to be compiled by Babel during the build
    include: [
      ...babelModules.map(nodeModule)
    ],
    use: [
      babelLoader
    ]
  })

  config.resolve.extensions.push('.web.js');
  config.resolve.extensions.push('.web.ts');
  config.resolve.extensions.push('.web.tsx');
  config.resolve.extensions.push('.tsx');
  config.resolve.extensions.push('.ts');
  config.resolve.extensions.push('.js');
  config.resolve.extensions.push('.windows.js');
  // config.resolve.extensions.push('.android.js');

  config.resolve.modules = [
    path.resolve(__dirname, '..', 'src'),
    'node_modules',
  ];

  config.plugins.push(
    new FixDefaultImportPlugin(),
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
