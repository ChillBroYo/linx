module.exports = function(api) {
  api.cache(true);
  return {
    plugins: ['emotion'],
    presets: ['babel-preset-expo'],
  };
};
