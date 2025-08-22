import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { responsiveSize } from './responsive';

interface DefaultAvatarProps {
  size?: number;
}

// Default avatar URL'ini döndüren utility fonksiyon
export const getDefaultAvatarUrl = (): string => {
  return 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
};

// Default avatar component'i
const DefaultAvatar: React.FC<DefaultAvatarProps> = ({ 
  size = responsiveSize(48)
}) => {
  return (
    <Image
      source={{
        uri: getDefaultAvatarUrl()
      }}
      style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
      resizeMode="cover"
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: '#f0f0f0',
  },
});

export default DefaultAvatar;
