module.exports = {
  extraNodeModules: require('node-libs-react-native'),

  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer')
  },
  getSourceExts() {
    return ['ts', 'tsx'];
  }
}
