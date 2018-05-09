import React from 'react';
import {
   View,
   Dimensions,
   Modal,
   TextInput
} from 'react-native';
import { Button } from 'react-native-elements';
import { appTextColor, appFont } from '../config/constants';

const screen = Dimensions.get('window');

const ReviewForm = ({ isShow, onSubmit, onInputText, onCancel, text }) => (
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
               <TextInput
                  style={{ padding: 5, fontFamily: appFont }}   
                  placeholder="Pick a review..."
                  multiline
                  numberOfLines={4}
                  onChangeText={onInputText}
                  value={text}
               />
            </View> 
            <Button
               title="OK"
               rounded
               backgroundColor={appTextColor}
               fontFamily={appFont}
               onPress={onSubmit}
            />
            <View style={{ height: 5 }} />
            <Button
               title="CANCEL"
               rounded
               textStyle={styles.textStyle}
               buttonStyle={styles.buttonStyle}
               backgroundColor="#FFF"
               onPress={onCancel}
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
