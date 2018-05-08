import React from 'react';
import {
   View,
   Text,
   Dimensions,
   Modal
} from 'react-native';
import { Button } from 'react-native-elements';
import { appTextColor, appFont } from '../config/constants';

const screen = Dimensions.get('window');

const ReviewForm = ({ isShow, onShowForm }) => (
   <Modal
      animationType="slide"
      transparent
      visible={isShow}
      onRequestClose={() => console.log(11)}
   >
      <View style={{ flex: 1 }}>
         <View style={{ flex: 1 }} />
         <View style={styles.container}>
            <View style={{ flex: 1 }}>
               <Text>saddadddsadasd</Text>
               <Text>saddadddsadasd</Text>
               <Text>saddadddsadasd</Text>
            </View> 
            <Button
               title="OK"
               rounded
               backgroundColor={appTextColor}
               fontFamily={appFont}
            />
            <View style={{ height: 5 }} />
            <Button
               title="CANCEL"
               rounded
               textStyle={styles.textStyle}
               buttonStyle={styles.buttonStyle}
               backgroundColor="#FFF"
               onPress={onShowForm}
               fontFamily={appFont}
            />
            <View style={{ height: 5 }} />
         </View>
      </View>
   </Modal>
);

export default ReviewForm;

const styles = {
   container: {
      backgroundColor: '#FFF',
      borderTopWidth: 1,
      borderColor: appTextColor,
      height: screen.height * 0.4,
   },
   textStyle: {
      color: appTextColor
   },
   buttonStyle: {
      borderColor: appTextColor,
      borderWidth: 1
   }
};
