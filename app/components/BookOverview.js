import React from 'react';
import { Image, View, Text } from 'react-native';
import { appFont, darkColor, appTextColor } from '../config/constants';

const BookOverview = ({ book }) => (
   <View style={styles.overview}>
      <Image
         source={{ uri: book.thumbnail }}
         style={styles.thumbnail}
      />
      <View style={styles.bookInfo}>
         <Text style={styles.title}>{book.title}</Text>
         <Text style={styles.author}>{book.author}</Text>
         <Text style={styles.otherText}>
            {book.is_finished ? `Finished: ${book.date_finished}` : 'In Proccess'}
         </Text>
         <Text style={styles.otherText}>{`Page: ${book.page}`}</Text>
      </View>
   </View>
);

export default BookOverview;

const styles = {
   overview: {
      flexDirection: 'row',
      paddingBottom: 10,
      borderColor: '#E0E0E0',
      borderBottomWidth: 1
   },
   thumbnail: {
      width: 80,
      height: 110,
      resizeMode: 'contain'
   },
   bookInfo: {
      paddingLeft: 10,
      width: 0,
      flexGrow: 1
   },
   title: {
      fontSize: 16,
      fontFamily: appFont
   },
   author: {
      fontSize: 14,
      fontFamily: appFont,
      color: appTextColor
   },
   otherText: {
      fontSize: 14,
      fontFamily: appFont,
      color: darkColor
   }
}; 
