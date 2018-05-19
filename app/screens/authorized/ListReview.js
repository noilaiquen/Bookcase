import React, { Component } from 'react';
import {
   View,
   FlatList,
   StatusBar,
   ActivityIndicator
} from 'react-native';
import { ReviewListItem, HeaderLeft } from '../../components';
import { firebaseApp } from '../../config/firebaseConfig';
import { appColor, appTextColor } from '../../config/constants';

export default class ListReview extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isLoading: false,
         reviews: []
      };
      this.ref = firebaseApp.database().ref('reviews');
   }

   componentDidMount() {
      this.fetchReviews();
   }

   fetchReviews = async () => {
      this.setState({ isLoading: true });
      
      const { bookId } = this.props.navigation.state.params;
      let reviews = [];

      this.ref.child(bookId).once('value').then(snapshot => {
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
      const { isLoading, reviews } = this.state;
      return (
         <View style={styles.container}>
            <StatusBar barStyle="dark-content" />   
            <View style={{ marginTop: 20, marginBottom: 10 }}>   
               <HeaderLeft
                  icon="ios-arrow-back"
                  text="Back"
                  color={appColor}
                  onPress={() => this.props.navigation.goBack()}
               />
            </View>
            {isLoading ? (
               <View style={styles.loadingContainer}>
                  <ActivityIndicator
                     animating
                     color={appTextColor}
                     size="small"
                  />
               </View>
            ) : (
               <FlatList
                  data={reviews}
                  keyExtractor={(item) => item.key}  //eslint-disable-line
                  renderItem={({ item }) => (
                     <ReviewListItem review={item} />
                  )}
               />
            )}
         </View>
      );
   }
}

const styles = {
   container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#FFF'
   },
   loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF'
   }
};
