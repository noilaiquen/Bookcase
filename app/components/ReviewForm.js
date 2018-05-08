import React from 'react';
import {
   View,
   Text,
   Dimensions,
   Modal
} from 'react-native';
import { Button } from 'react-native-elements';
import { appTextColor } from '../config/constants';

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
            <Text>adsdad</Text>
            <Button
               title="close"
               onPress={onShowForm}
            />
         </View>
      </View>
   </Modal>
);

export default ReviewForm;

const styles = {
   container: {
      backgroundColor: appTextColor,
      height: screen.height / 2,
   }
};
