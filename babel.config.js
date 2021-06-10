module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'jsx-control-statements',
      [
        'module-resolver',
        {
          alias: {
            components: './src/components',
            styles: './src/styles',
            api: './src/api',
            helpers: './src/helpers',
            store: './src/store'
          },
        },
      ],
    ],
  };
};
