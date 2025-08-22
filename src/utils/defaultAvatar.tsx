import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { responsiveSize } from './responsive';

interface DefaultAvatarProps {
  size?: number;
}

const DefaultAvatar: React.FC<DefaultAvatarProps> = ({ 
  size = responsiveSize(48)
}) => {
  return (
    <Image
      source={{
        uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
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
