import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import moment from 'moment';
import { ReviewForm } from './index';
import { appTextColor, appFont, darkColor } from '../config/constants';

const timeAgo = (datetime, format = 'YYYY-MM-DD h:mm:ss') => (
   moment(datetime, format).fromNow()
);

class Review extends Component {
   constructor(props) {
      super(props);
      this.state = {
         showForm: false,
         review: ''
      };
      this.onShowForm = this.onShowForm.bind(this);
   }

   onShowForm() {
      this.setState({
         showForm: !this.state.showForm
      });
   }
   
   render() {
      return (
         <View>
            <Card 
               title="REVIEWS"
               containerStyle={styles.containerStyle}
               titleStyle={styles.cardTitle}
            >
               <View style={{ flex: 1 }}>
                  <View style={styles.reviewContainer}>
                     <View style={styles.reviewInfo} >
                        <Text style={{ fontFamily: appFont, color: appTextColor }}>Thanh Binh Nguyen </Text>
                        <Text style={{ fontFamily: appFont, fontSize: 10 }}> {timeAgo('2018-05-07 13:15:22')}</Text>
                     </View>
                     <View>
                        <Text style={{ fontFamily: appFont }}>Sach hay, mong ra som cac phan ke tiep</Text>
                     </View>
                  </View>
                  <View style={styles.reviewContainer}>
                     <View style={styles.reviewInfo} >
                        <Text style={{ fontFamily: appFont, color: appTextColor }}>Nguyen Tran </Text>
                        <Text style={{ fontFamily: appFont, fontSize: 10 }}> {timeAgo('2017-02-07 13:15:22')}</Text>
                     </View>
                     <View>
                        <Text style={{ fontFamily: appFont }}>Cha co veo gi hay, khong nen mua</Text>
                     </View>
                  </View>
                  <View style={styles.reviewContainer}>
                     <View style={styles.reviewInfo} >
                        <Text style={{ fontFamily: appFont, color: appTextColor }}>Tuong Vi </Text>
                        <Text style={{ fontFamily: appFont, fontSize: 10 }}> {timeAgo('2018-01-07 13:15:22')}</Text>
                     </View>
                     <View>
                        <Text style={{ fontFamily: appFont }}>Tam on, hy vong phan sau hay can how</Text>
                     </View>
                  </View>
                  <View style={styles.reviewContainer}>
                     <View style={styles.reviewInfo} >
                        <Text style={{ fontFamily: appFont, color: appTextColor }}>Van Teo Tran </Text>
                        <Text style={{ fontFamily: appFont, fontSize: 10 }}> {timeAgo('2016-02-12 8:15:22')}</Text>
                     </View>
                     <View>
                        <Text style={{ fontFamily: appFont }}>Cang doc cang me, vote 5*</Text>
                     </View>
                  </View>
               </View>
      
               <Button
                  title="WRITE A REVIEW"
                  backgroundColor={appTextColor}
                  onPress={this.onShowForm}
               />
            </Card>
      
            <ReviewForm
               isShow={this.state.showForm}
               onShowForm={this.onShowForm}
            />
         </View>
      );
   }
}

export default Review;

const styles = {
   containerStyle: {
      marginHorizontal: 0
   },
   cardTitle: {
      fontFamily: appFont,
      fontWeight: '100',
      fontSize: 16
   },
   reviewContainer: {
      paddingBottom: 5,
      marginBottom: 10,
      borderBottomWidth: 0.5,
      borderColor: darkColor
   },
   reviewInfo: {
      flexDirection: 'row',
      alignItems: 'center'
   }
};
