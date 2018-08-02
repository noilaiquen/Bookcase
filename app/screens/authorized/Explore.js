import React, { Component } from 'react';
import {
   Text,
   View,
   Button,
   ScrollView
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
         <ScrollView contentContainerStyle={styles.container}>
            {list.map(item => (
               <View style={[styles.listItem, { backgroundColor: item.color }]} key={item.title}>
                  <Text style={styles.title}>{item.title}</Text>
               </View>
            ))}
         </ScrollView>
      );
   }
}

const styles = {
   container: {
      padding: 10,
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
};
