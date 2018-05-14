module.exports = {
  extraNodeModules: require('node-libs-react-native'),

  getTransformModulePath() {
    return require.resolve('./transformer.js')
  },

  getSourceExts() {
    return ['ts', 'tsx', 'graphql', 'gql'];
  }
}
