module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // react-native-reanimated's babel plugin must be listed last — it's a
    // transitive dependency of @react-navigation/drawer's animations.
    plugins: ['react-native-reanimated/plugin'],
  };
};
