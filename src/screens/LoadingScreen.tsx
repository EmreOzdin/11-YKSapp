import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { responsiveSize } from '../utils/responsive';
import { colors } from '../utils/theme';

const LoadingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={responsiveSize(40)} color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: responsiveSize(35),
  },
});

export default LoadingScreen;
