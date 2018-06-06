module.exports = {
  extraNodeModules: {
    ...require('node-libs-react-native'),
    'vm': require.resolve('vm-browserify/index.js'),
    'react-native-sqlite-storage': require.resolve('react-native-sqlcipher-storage/sqlite.js'),
  },

  getTransformModulePath() {
    return require.resolve('./transformer.js')
  },

  getSourceExts() {
    return ['ts', 'tsx', 'graphql', 'gql'];
  }
}
