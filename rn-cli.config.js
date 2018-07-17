module.exports = {
  extraNodeModules: {
    ...require('node-libs-react-native'),
    'vm': require.resolve('vm-browserify/index.js'),
    'react-native-sqlite-storage': require.resolve('react-native-sqlcipher-storage/sqlite.js'),

    'stream':	require.resolve('readable-stream/readable-browser.js'),
    '_stream_duplex':	require.resolve('readable-stream/duplex-browser.js'),
    '_stream_passthrough':	require.resolve('readable-stream/passthrough.js'),
    '_stream_readable':	require.resolve('readable-stream/readable-browser.js'),
    '_stream_transform':	require.resolve('readable-stream/transform.js'),
    '_stream_writable':	require.resolve('readable-stream/writable-browser.js'),
    'readable-stream/lib/internal/streams/stream.js': require.resolve('readable-stream/lib/internal/streams/stream-browser.js'),
  },

  getTransformModulePath() {
    return require.resolve('./transformer.js')
  },

  getSourceExts() {
    return ['ts', 'tsx', 'graphql', 'gql'];
  }
}
