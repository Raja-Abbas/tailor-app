import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function Header() {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/hamburger.png')}
        style={styles.icons}
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
    marginTop: 50,
    backgroundColor: '#fff', // Adjust the background color as needed
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, // Adjust the gap between icons as needed
  },
  icon: {
    width: 26,
    height: 26,
  },
  iconthree: {
    width: 36,
    height: 36, // Adjust the size as needed
  },
  icons: {
    width: 20, // Adjust the size as needed
    height: 15, // Adjust the size as needed
  },
});
