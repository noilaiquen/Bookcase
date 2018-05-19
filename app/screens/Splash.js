import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import logo from '../assets/icon.png';
import { appColor } from '../config/constants';

const Splash = () => {
   const { container, logoImage } = styles;
   return (
      <View style={container}>
         <Image style={logoImage} source={logo} />
      </View>
   );
};

export default Splash;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: appColor
   },
   logoImage: {
      width: 100,
      resizeMode: 'contain'
   }
});
