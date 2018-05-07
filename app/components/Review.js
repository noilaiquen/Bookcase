import React from 'react';
import { Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { appTextColor, appFont, darkColor } from '../config/constants';

const Review = () => (
   <Card 
      title="REVIEWS"
      containerStyle={styles.containerStyle}
      titleStyle={styles.cardTitle}
   >
      <View style={{ flex: 1}}>
         <View style={{ paddingBottom: 5, marginBottom: 10, borderBottomWidth: 0.5, borderColor: darkColor }}>
            <View style={{ flexDirection: 'row'}} >
               <Text style={{ fontFamily: appFont, color: appTextColor }}>Thanh Binh Nguyen </Text>
               <Text style={{ fontFamily: appFont }}> 2018-04-01 15:24:33</Text>
            </View>
            <View>
               <Text style={{ fontFamily: appFont }}>Sach hay, mong ra som cac phan ke tiep</Text>
            </View>
         </View>
         <View style={{ paddingBottom: 5, marginBottom: 10, borderBottomWidth: 1, borderColor: darkColor }}>
            <View style={{ flexDirection: 'row'}} >
               <Text style={{ fontFamily: appFont, color: appTextColor }}>Nguyen Tran </Text>
               <Text style={{ fontFamily: appFont }}> 2018-10-11 05:24:33</Text>
            </View>
            <View>
               <Text style={{ fontFamily: appFont }}>Cha co veo gi hay, khong nen mua</Text>
            </View>
         </View>
         <View style={{ paddingBottom: 5, marginBottom: 10, borderBottomWidth: 1, borderColor: darkColor }}>
            <View style={{ flexDirection: 'row'}} >
               <Text style={{ fontFamily: appFont, color: appTextColor }}>Tuong Vi </Text>
               <Text style={{ fontFamily: appFont }}> 2018-1-01 18:20:33</Text>
            </View>
            <View>
               <Text style={{ fontFamily: appFont }}>Tam on, huy vong phan sau hay can how</Text>
            </View>
         </View>
         <View style={{ paddingBottom: 5, marginBottom: 10, borderBottomWidth: 1, borderColor: darkColor }}>
            <View style={{ flexDirection: 'row'}} >
               <Text style={{ fontFamily: appFont, color: appTextColor }}>Van Teo Tran </Text>
               <Text style={{ fontFamily: appFont }}> 2017-07-03 08:10:33</Text>
            </View>
            <View>
               <Text style={{ fontFamily: appFont }}>Cang doc cang me, vote 5*</Text>
            </View>
         </View>
      </View>

      <Button
         title="WRITE A REVIEW"
         backgroundColor={appTextColor}
      />
   </Card>
);

export default Review;

const styles = {
   containerStyle: {
      marginHorizontal: 0
   },
   cardTitle: {
      fontFamily: appFont,
      fontWeight: '100',
      fontSize: 16
   }
};
