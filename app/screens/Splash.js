import React from 'react';
import { Image, StyleSheet } from 'react-native';
import splash from '../assets/splash.jpg';

const Splash = () => (
   <Image
      source={splash}
      style={styles.image}
   />
);

export default Splash;

const styles = StyleSheet.create({
   image: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'cover'
   }
});
