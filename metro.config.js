const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Realm için resolver ayarları
config.resolver.alias = {
  ...config.resolver.alias,
  'bson': require.resolve('bson'),
};

// Realm için transformer ayarları
config.transformer.minifierConfig = {
  keep_fnames: true,
  mangle: {
    keep_fnames: true,
  },
};

module.exports = config;
