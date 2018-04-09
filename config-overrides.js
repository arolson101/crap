var path = require("path");

const rewireGqlTag = require('react-app-rewire-graphql-tag');

function nodeModule(mod) {
  return path.resolve(__dirname, './node_modules/' + mod)
}

module.exports = function override(config, env) {
  // config = rewireGqlTag(config,env);

  //do stuff with the webpack config...
  config.resolve.alias = {
    // ...config.resolve.alias,

    'react-native': 'react-native-web',
    // 'react-router-native': 'react-router',
    // 'react-native/Libraries/Renderer/shims/ReactNativePropRegistry': 'react-native-web/dist/modules/ReactNativePropRegistry/index.js',
    // 'react-native-vector-icons/Fonts': nodeModule('react-native-vector-icons/Fonts'), // need to avoid aliasing Font dir
    // 'react-native-vector-icons': 'react-native-vector-icons/dist',

    // for native-base
    // 'react-native/Libraries/Renderer/shims/ReactNativePropRegistry': 'react-native-web/dist/modules/ReactNativePropRegistry/index.js',
		// 'react/lib/ReactNativePropRegistry': 'react-native-web/dist/modules/ReactNativePropRegistry'
  };

  config.module.rules[0] =
  // https://gist.github.com/micimize/bf64ecbb6a32c236534a3431e76b27bb
  {
    test: /.(jsx?|mjs)$/,
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

    use: {
      loader: 'babel-loader',
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
    }
  }

  // config.module.rules.unshift({
  //   test: /\.graphqls?$/, loader: require('graphql-tag/loader'), exclude: '/node_modules/',
  // })

  // config.resolve.extensions = [
  //   ...config.resolve.extensions,
  //   '.windows.js',
  //   '.ios.js',
  // ];

  // console.log(JSON.stringify(config, null, "  "));
  return config;
}
