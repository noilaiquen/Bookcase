import React from 'react';
import {
   View,
   Text,
   Image,
   TouchableWithoutFeedback,
   Keyboard
} from 'react-native';
import { appFont, darkColor } from '../config/constants';

const defaultThumbnail = 'https://firebasestorage.googleapis.com/v0/b/bookcase-d1e17.appspot.com/o/thumbnail%2FNo_book_cover_lg.jpg?alt=media&token=18f98f4f-1cfa-4610-b6db-bd7478849a20';

const SearchListItem = ({ book, onSelect }) => {
   const { imageLinks, title, authors } = book.volumeInfo;
   const thumbnail = imageLinks ? imageLinks.smallThumbnail : defaultThumbnail;
   // const author = authors[0] !== undefined ? authors[0] : 'No author';
   return (
      <TouchableWithoutFeedback
         onPress={() => {
            Keyboard.dismiss();
            onSelect(book.volumeInfo);
         }}
      >
         <View style={styles.container}>
            <Image
               source={{ uri: thumbnail }}
               style={styles.icon}
            />
            <View style={styles.bookInfo}>
               <Text
                  style={styles.title}
                  numberOfLines={2}
                  ellipsizeMode={'tail'}
               >
                  {title}
               </Text>
               {/* <Text
                  style={styles.author}
                  numberOfLines={2}
                  ellipsizeMode={'tail'}
               >
                  {author}
               </Text> */}
            </View>
         </View>
      </TouchableWithoutFeedback>
   
   );
};

export default SearchListItem;

const styles = {
   container: {
      padding: 10,
      marginHorizontal: 15,
      borderBottomWidth: 0.5,
      borderColor: '#EEE',
      flexDirection: 'row',
   },
   bookInfo: {
      width: 0,
      flexGrow: 1,
      paddingLeft: 10
   },
   title: {
      fontFamily: appFont,
      fontSize: 14,
      color: darkColor
   },
   auhtor: {
      fontFamily: appFont,
      fontSize: 12
   },
   icon: {
      width: 50,
      height: 50,
      resizeMode: 'contain'
   }
};
