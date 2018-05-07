import React, { Component } from 'react';
import {
   View,
   Text,
   StyleSheet,
   Image,
   TouchableOpacity,
   Keyboard
} from 'react-native';
import { Icon } from 'react-native-elements';
import { appFont, darkColor, appTextColor, appFontBold } from '../config/constants';

export default class BookcaseListItem extends Component {
   render() {
      const { book } = this.props;
      return (
         <TouchableOpacity
            onPress={() => {
               Keyboard.dismiss();
               this.props.navigation.navigate('ViewBook', { book_id: book._id });
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
         </TouchableOpacity>
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
      fontFamily: appFontBold,
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
