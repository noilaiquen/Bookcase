import React, { Component } from 'react';
import {
   View,
   Text,
   StyleSheet,
   Image,
   TouchableWithoutFeedback,
   Keyboard
} from 'react-native';
import { Icon, Rating } from 'react-native-elements';
import { appFont, darkColor, appTextColor } from '../config/constants';

export default class BookcaseListItem extends Component {
   render() {
      const { book } = this.props;
      return (
         <TouchableWithoutFeedback
            onPress={() => {
               Keyboard.dismiss();
               this.props.navigation.navigate('ViewBook', { bookId: book._id });
            }}
         >
            <View style={styles.container}>
               <Image source={{ uri: book.thumbnail }} style={styles.icon} />
               <View style={styles.bookInfo}>
                  <Text
                     style={styles.title}
                     numberOfLines={2}
                     ellipsizeMode={'tail'}
                  >
                     {book.title}
                  </Text>
                  <Text
                     style={styles.author}
                     numberOfLines={2}
                     ellipsizeMode={'tail'}
                  >
                     {book.author}
                  </Text>
                  <Text
                     style={styles.page}
                     numberOfLines={2}
                     ellipsizeMode={'tail'}
                  >
                     Page: {book.page}
                  </Text>
                  <Rating
                     type='heart'
                     readonly
                     startingValue={book.rating}
                     imageSize={12}
                  />
               </View>
               <View style={{ position: 'absolute', right: 10 }}>
                  <Icon
                     name="ios-arrow-forward-outline"
                     type="ionicon"
                     size={28}
                     color="#d35400"
                  />
               </View>
            </View>
         </TouchableWithoutFeedback>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      height: 100,
      marginHorizontal: 10,
      paddingHorizontal: 10,
      marginBottom: 10,
      alignItems: 'center',
      backgroundColor: '#fff',
      flexDirection: 'row',
      elevation: 2
   },
   bookInfo: {
      width: 0,
      flexGrow: 1,
      paddingLeft: 10
   },
   title: {
      fontFamily: appFont,
      // fontWeight: '600',
      fontSize: 16,
      color: darkColor
   },
   auhtor: {
      fontFamily: appFont,
      fontSize: 12
   },
   icon: {
      width: 80,
      height: 80,
      resizeMode: 'contain'
   },
   page: {
      fontFamily: appFont,
      color: appTextColor
   }
});
