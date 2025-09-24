module.exports = {
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        android: {
          sourceDir: '../node_modules/react-native-vector-icons/android',
          packageImportPath: 'import io.github.react_native_vector_icons.VectorIconsPackage;',
        },
      },
    },
  },
  // Exclude react-native-vector-icons from codegen by setting it to null
  codegen: {
    libraries: {
      'react-native-vector-icons': null,
    },
  },
};
