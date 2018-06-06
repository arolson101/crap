module.exports = {
  extraNodeModules: {
    ...require('node-libs-react-native'),
    'vm': require.resolve('vm-browserify/index.js')
  },

  getTransformModulePath() {
    return require.resolve('./transformer.js')
  },

  getSourceExts() {
    return ['ts', 'tsx', 'graphql', 'gql'];
  }
}
