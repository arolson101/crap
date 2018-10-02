const { getDefaultConfig } = require("metro-config");

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig();

  return {
    transformer: {
      babelTransformerPath: require.resolve('./transformer.js'),
    },
    resolver: {
      extraNodeModules: {
        ...require('node-libs-react-native'),
        'vm': require.resolve('vm-browserify/index.js'),
        'react-native-sqlite-storage': require.resolve('react-native-sqlcipher-storage/sqlite.js'),

        'stream':	require.resolve('react-native-stream'),
      },

      sourceExts: [...sourceExts, "graphql", "gql"]
    }
  };
})();
