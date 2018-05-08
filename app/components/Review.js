import React, { Component } from 'react';
import { View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { ReviewForm, ReviewListItem } from './index';
import { appTextColor, appFont } from '../config/constants';

const reviews = [
   {
      key: 1212,
      reviewerName: 'Thanh Binh Nguyen',
      datetimeReview: '2018-01-03 13:22:32',
      content: 'Hay, đáng để đọc'
   },
   {
      key: 1231,
      reviewerName: 'Teo Van Nguyen',
      datetimeReview: '2017-03-12 10:12:42',
      content: 'Méo có gì đặc sắc cả'
   },
   {
      key: 312331,
      reviewerName: 'Tuong Vi Nguyen',
      datetimeReview: '2018-04-15 3:22:32',
      content: 'Truyện phải nói là quá hay, 5*'
   }
];

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
                  {reviews.map(review => <ReviewListItem review={review} key={review.key} />)}
               </View>

               <Button
                  rounded
                  title="WRITE A REVIEW"
                  backgroundColor={appTextColor}
                  onPress={this.onShowForm}
                  fontFamily={appFont}
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
   }
};
