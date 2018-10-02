const gqlLoader = require('graphql-tag/loader');
const tsTransformer = require("react-native-typescript-transformer");

const gqlTransform = gqlLoader.bind({
  cacheable: () => null,
});

module.exports.transform = function({ src, filename, options }) {
  if (filename.endsWith(".graphql") || filename.endsWith(".gql")) {
    src = gqlTransform(src);
  }
  return tsTransformer.transform({ src, filename, options });
};
