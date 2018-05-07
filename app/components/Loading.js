import React from 'react';
import { Modal, StyleSheet, View, Dimensions, ActivityIndicator, Text } from 'react-native';
import { appFont } from '../config/constants';

const screen = Dimensions.get('window');

const Loading = props => (
   <Modal
      visible={props.isVisible}
      animationType={'none'}
      transparent
      onRequestClose={() => console.log('Hide loading')}
   >
      <View style={styles.modalContainer}>
         <View style={styles.modalBody}>   
            <ActivityIndicator size={40} color="#FFF" />
         </View>
      </View>   
   </Modal>   
);

export default Loading;

const styles = StyleSheet.create({
   modalContainer: {
      width: screen.width,
      height: screen.height,
      backgroundColor: 'rgba(0,0,0,0.3)',
      justifyContent: 'center',
      alignItems: 'center'
   },
   modalBody: {
      width: 100,
      height: 100,
      borderRadius: 10,
      backgroundColor: 'rgba(255,255,255,0.3)',
      justifyContent: 'center',
      alignItems: 'center'
   },
   textLoading: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: appFont
   }
});

