import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function Header() {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/hamburger.png')}
        style={styles.icons}
      />
      <Image
        source={require('@/assets/images/logo.png')}
        style={styles.iconslogo}
      />
      <View style={styles.rightIcons}>
        <Image
          source={require('@/assets/images/heart.png')}
          style={styles.icon}
        />
        <Image
          source={require('@/assets/images/bell.png')}
          style={styles.iconthree}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    width: 26,
    height: 26,
  },
  iconslogo: {
    width: 100,
    height: 30,
  },
  iconthree: {
    width: 36,
    height: 36,
  },
  icons: {
    width: 20,
    height: 15,
  },
});
