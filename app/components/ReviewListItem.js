import React from 'react';
import {
   View,
   Text
} from 'react-native';
import { appFont, darkColor, appTextColor } from '../config/constants';
import { timeAgo } from '../utils';

const ReviewListItem = ({ review }) => (
   <View style={styles.reviewContainer}>
      <View style={styles.reviewInfo} >
         <Text style={styles.reviewerText}>{review.name}</Text>
         <Text style={styles.timeText}> {` ${timeAgo(review.datetimeReview)}`}</Text>
      </View>
      <View>
         <Text style={styles.contentText}>{review.content}</Text>
      </View>
   </View>
);
export default ReviewListItem;

const styles = {
   reviewContainer: {
      paddingBottom: 5,
      marginBottom: 10,
      borderBottomWidth: 0.5,
      borderColor: darkColor
   },
   reviewInfo: {
      flexDirection: 'row',
      alignItems: 'center'
   },
   reviewerText: {
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

