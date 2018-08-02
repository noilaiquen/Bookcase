import React from 'react';
import {
   View,
   Text,
   Button
} from 'react-native';
import { appFont, appTextColor } from '../config/constants';

const BookcaseEmpty = ({ navigation }) => (
   <View style={styles.container}>
      <Text style={styles.message}>You have no book!</Text>
      <Button
         title="Add book"
         color={appTextColor}
         style={styles.button}
         onPress={() => navigation.navigate('Add')}
      />
   </View>
);

export default BookcaseEmpty;

const styles = {
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   message: {
      fontFamily: appFont,
      fontSize: 16,
      marginBottom: 15
   }
};

