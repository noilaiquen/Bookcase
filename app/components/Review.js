import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import { Card, Button } from 'react-native-elements';
import moment from 'moment';
import { ReviewForm, ReviewListItem } from './index';
import { firebaseApp } from '../config/firebaseConfig';
import { appTextColor, appFont, appColor } from '../config/constants';
import global from '../config/global';

class Review extends Component {
   constructor(props) {
      super(props);
      this.state = {
         showForm: false,
         text: '',
         reviews: [],
         isLoading: false
      };
      this.ref = firebaseApp.database().ref('reviews');
      this.onShowForm = this.onShowForm.bind(this);
      this.onInputText = this.onInputText.bind(this);
      this.onCancel = this.onCancel.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
   }

   componentDidMount() {
      this.fetchReviews();
   }

   onShowForm() {
      this.setState({
         showForm: !this.state.showForm
      });
   }

   onInputText(text) {
      this.setState({
         text
      }, () => console.log(this.state.text));
   }

   onCancel() {
      this.setState({
         text: '',
         showForm: false
      });
   }

   onSubmit = async () => {
      const { bookId } = this.props;
      const { text } = this.state;
      try {
         await this.ref.child(bookId).push({
            name: 'Thanh Binh Nguyen',
            content: text,
            datetimeReview: moment().format('YYYY-MM-DD HH:mm:ss')
         });
         this.setState({
            showForm: false,
            text: ''
         }, () => global.setLoadingVisible(false));
      } catch (err) {
         global.setLoadingVisible(false);
         ToastAndroid.show('Somethings was wrong!', ToastAndroid.LONG);
      }
   }

   fetchReviews = async () => {
      this.setState({ isLoading: true });
      const { bookId } = this.props;
      let reviews = [];

      this.ref.child(bookId).limitToFirst(5).once('value').then(snapshot => {
         snapshot.forEach(childSnapshot => {
            reviews.push({
               key: childSnapshot.key,
               name: childSnapshot.val().name,
               content: childSnapshot.val().content,
               datetimeReview: childSnapshot.val().datetimeReview
            });
         });
         this.setState({ reviews, isLoading: false });
      });
   }
   
   render() {
      const { reviews, isLoading } = this.state;
      return (
         <View>
            <Card 
               title="REVIEWS"
               containerStyle={styles.containerStyle}
               titleStyle={styles.cardTitle}
            >
               {isLoading ? (
                  <View style={styles.loadingContainer}>
                     <ActivityIndicator
                        animating
                        color={appTextColor}
                        size="small"
                     />
                  </View>
               ) : (
                  <View style={{ flex: 1 }}>
                     {reviews.length === 0 ? (
                        <Text style={styles.noReviewText}>No review</Text>
                     ) : reviews.map(review => <ReviewListItem review={review} key={review.key} />) }      
                  </View>
               )}   

               <View>
                  {reviews.length > 0 && (
                     <TouchableOpacity
                        style={styles.btnShowMore}
                        onPress={() => this.props.navigation.navigate('Reviews', { bookId: this.props.bookId })}
                     >
                        <Text style={styles.textShowMore}>Show more</Text>
                     </TouchableOpacity>
                  )}

                  <Button
                     rounded
                     title="WRITE A REVIEW"
                     backgroundColor={appTextColor}
                     onPress={this.onShowForm}
                     fontFamily={appFont}
                  />
               </View>
            </Card>
      
            <ReviewForm
               isShow={this.state.showForm}
               onShowForm={this.onShowForm}
               onInputText={this.onInputText}
               onSubmit={this.onSubmit}
               onCancel={this.onCancel}
               text={this.state.text}
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
   loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF'
   },
   cardTitle: {
      fontFamily: appFont,
      fontWeight: '100',
      fontSize: 16
   },
   btnShowMore: {
      alignSelf: 'center',
      height: 30
   },
   textShowMore: {
      fontFamily: appFont,
      color: appColor
   },
   noReviewText: {
      fontFamily: appFont,
      alignSelf: 'center',
      marginBottom: 15
   }
};
