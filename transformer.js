// const gqlLoader = require('graphql-tag/loader');
const tsTransformer = require("react-native-typescript-transformer");
const gqlTransformer = require("react-native-graphql-transformer");

// const gqlTransform = gqlLoader.bind({
//   cacheable: () => null,
// });

module.exports.transform = function({ src, filename, options }) {
  if (filename.endsWith(".graphql") || filename.endsWith(".gql")) {
    return gqlTransformer.transform({ src, filename, options });
  }
  return tsTransformer.transform({ src, filename, options });
};
