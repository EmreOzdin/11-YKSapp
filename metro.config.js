const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Realm için resolver ayarları
config.resolver.alias = {
  ...config.resolver.alias,
  bson: require.resolve('bson'),
};

// Metro export hatalarını çözmek için resolver ayarları
config.resolver.platforms = ['ios', 'android', 'native', 'web'];
config.resolver.sourceExts = ['js', 'json', 'ts', 'tsx', 'jsx'];

// Metro export hatalarını bypass etmek için
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];
config.resolver.unstable_enablePackageExports = false;

// Polyfill desteği için
config.resolver.nodeModulesPaths = [
  require('path').resolve(__dirname, 'node_modules'),
];

// URL polyfill App.tsx'de import ediliyor

// Realm için transformer ayarları
config.transformer.minifierConfig = {
  keep_fnames: true,
  mangle: {
    keep_fnames: true,
  },
};

// Metro server ayarları
config.server = {
  ...config.server,
  enhanceMiddleware: middleware => {
    return (req, res, next) => {
      // Metro export hatalarını bypass et
      if (
        req.url &&
        (req.url.includes('TerminalReporter') ||
          req.url.includes('getGraphId') ||
          req.url.includes('FileStore'))
      ) {
        return next();
      }
      return middleware(req, res, next);
    };
  },
};

module.exports = config;
