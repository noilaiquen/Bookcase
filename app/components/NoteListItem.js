import React from 'react';
import {
   View,
   Text
} from 'react-native';
import { appFont, darkColor, appTextColor } from '../config/constants';
import { timeAgo } from '../utils';

const NoteListItem = ({ note }) => (
   <View style={styles.noteContainer}>
      <View style={styles.noteInfo} >
         <Text style={styles.noteerText}>{note.name}</Text>
         <Text style={styles.timeText}> {` ${timeAgo(note.datetimeNote)}`}</Text>
      </View>
      <View>
         <Text style={styles.contentText}>{note.content}</Text>
      </View>
   </View>
);
export default NoteListItem;

const styles = {
   noteContainer: {
      paddingBottom: 5,
      marginBottom: 10,
      borderBottomWidth: 0.5,
      borderColor: darkColor
   },
   noteInfo: {
      flexDirection: 'row',
      alignItems: 'center'
   },
   noteerText: {
      fontFamily: appFont,
      color: appTextColor
   },
   timeText: {
      fontFamily: appFont,
      fontSize: 10
   },
   contentText: {
      fontFamily: appFont
   }
};

