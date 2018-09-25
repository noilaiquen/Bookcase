import React, { Component } from 'react';
import {
   Text,
   View,
} from 'react-native';
import { appFont } from '../../config/constants';

const list = [
   {
      title: '#EF5350',
      color: '#EF5350'
   },
   {
      title: '#F44336',
      color: '#F44336'
   },
   {
      title: '#E91E63',
      color: '#E91E63'
   },
   {
      title: '#8E24AA',
      color: '#8E24AA'
   },
   {
      title: '#D32F2F',
      color: '#D32F2F'
   },
   {
      title: '#00695C',
      color: '#00695C'
   },
];

export default class Explore extends Component {
   render() {
      return (
         <View style={styles.container}>
            <Text style={styles.textUpdate}>Updating</Text>
         </View>
      );
   }
}

const styles = {
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF'
   },
   listItem: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
      borderRadius: 5,
      elevation: 1.5,
      marginBottom: 10
   },
   title: {
      fontSize: 20,
      fontFamily: appFont,
      color: '#FFF'
   },
   textUpdate: {
      fontSize: 20,
      fontFamily: appFont,
      // color: '#'
   }
};
