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

const NoteForm = ({ isShow, onSubmit, onInputText, onCancel, text }) => (
   <Modal
      animationType="slide"
      transparent
      visible={isShow}
      onRequestClose={() => null}
   >
      <View style={{ flex: 1 }}>
         <View style={{ flex: 1 }} />
         <View style={styles.container}>
            <View style={{ flex: 1 }}>
               <TextInput
                  style={{ padding: 5, fontFamily: appFont }}   
                  placeholder="Pick a note..."
                  multiline
                  numberOfLines={4}
                  onChangeText={onInputText}
                  value={text}
               />
            </View> 
            <Button
               title="Ok"
               rounded
               backgroundColor={appTextColor}
               fontFamily={appFont}
               onPress={onSubmit}
            />
            <View style={{ height: 5 }} />
            <Button
               title="Cancel"
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

export default NoteForm;

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
