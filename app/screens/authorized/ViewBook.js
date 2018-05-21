import React, { Component } from 'react';
import {
   View,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   Switch,
   Alert,
   DeviceEventEmitter
} from 'react-native';
import { Button, Icon, Rating } from 'react-native-elements';
import { Header, BookOverview, Note } from '../../components';
import { firebaseApp } from '../../config/firebaseConfig';
import { appTextColor, darkColor, appFont, appColor } from '../../config/constants';
import { DatePicker } from '../../utils';
import global from '../../config/global';

const HeaderScreen = ({ goBack, onRemove }) => (
   <Header
      leftComponent={{
         icon: 'ios-arrow-back',
         onPress: goBack,
         text: 'Book List'
      }}
      rightComponent={{ 
         icon: 'md-trash',
         onPress: onRemove
      }}
   />
);

export default class ViewBook extends Component {
   constructor(props) {
      super(props);
      this.state = {
         error: false,
         book: null,
         updateInfo: null,
         bookId: null
      };
      this.onRemove = this.onRemove.bind(this);
      this.onUpdate = this.onUpdate.bind(this);
      this.ref = firebaseApp.database().ref('bookcase');
   }

   componentDidMount = () => {
      this.fetchBook();
   }

   onRemove = () => {
      Alert.alert('', 'Delete this book?',
         [
            { text: 'Cancel', onPress: () => null, style: 'cancel' },
            {
               text: 'Yes! Delete it.',
               onPress: async () => {
                  const { bookId } = this.state;
                  const { navigation } = this.props;
                  await this.ref.child(bookId).remove();
                  DeviceEventEmitter.emit('refreshBookcase');
                  navigation.goBack();
               }
            }
         ],
         { cancelable: false }
      );
   }

   onUpdate = async () => {
      const { navigation } = this.props;
      const { updateInfo, bookId } = this.state;

      if (updateInfo !== null) {
         global.setLoadingVisible(true);
         await this.ref.child(bookId).update(updateInfo);
         global.setLoadingVisible(false);
         navigation.goBack();
      } else {
         navigation.goBack();
      }
   }

   fetchBook = async () => {
      global.setLoadingVisible(true);
      const { book_id } = this.props.navigation.state.params;
      const snapshot = await this.ref.child(book_id).once('value');
      
      if (snapshot.val()) {
         this.setState({
            bookId: snapshot.key,
            book: snapshot.val()
         }, () => global.setLoadingVisible(false));
      } else {
         this.setState({
            error: true
         }, () => global.setLoadingVisible(false));
      }
   };
   
   render() {
      const {
         content, inputGroup, label, inputGroupItem,
         formGroup, switchStyle, container, summary
      } = styles;
      const { book, error, updateInfo, bookId } = this.state;

      if (error) {
         return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
               <Text>Error</Text>
               <Button
                  title="Back"
                  onPress={() => this.props.navigation.goBack()}
               />   
            </View>   
         );
      }

      if (book === null) {
         return null;
      }

      return (
         <ScrollView>
            <HeaderScreen {...this.props} onRemove={this.onRemove} goBack={this.onUpdate} />
            <View style={container}>
               <View style={content}>
                  <BookOverview book={book} />

                  <View style={formGroup}>
                     <Text style={label}>{`Rate ${book.rating}`}</Text>   
                     <Rating
                        type='heart'
                        fractions={1}
                        startingValue={book.rating}
                        imageSize={30}
                        onFinishRating={number =>
                           this.setState({
                              book: { ...book, rating: number },
                              updateInfo: { ...updateInfo, rating: number }
                           })
                        }
                     />
                  </View>

                  <View style={formGroup}>
                     <View style={inputGroup}>
                        <View style={{ height: 50 }}>   
                           <Text style={label}>Finished Book</Text>
                           <Switch
                              onValueChange={() =>
                                 this.setState({
                                    book: { ...book, is_finished: !book.is_finished },
                                    updateInfo: { ...updateInfo, is_finished: !book.is_finished }
                                 })
                              }
                              value={book.is_finished}
                              style={switchStyle}
                              onTintColor={appTextColor}
                              thumbTintColor={book.is_finished ? appTextColor : darkColor}
                           />
                        </View>
                        {book.is_finished ? (
                           <View>
                              <Text style={label}>Date Finished</Text>
                              <TouchableOpacity
                                 style={inputGroupItem}
                                 onPress={
                                    () => DatePicker(
                                       date => this.setState({
                                          book: { ...book, date_finished: date },
                                          updateInfo: { ...updateInfo, date_finished: date }
                                    }))
                                 }
                              >
                                 <Icon
                                    name="md-calendar"
                                    type="ionicon"
                                    size={20}
                                    color={appTextColor}
                                 />
                                 <Text style={summary}>{` ${book.date_finished}`}</Text>
                              </TouchableOpacity>
                           </View>
                        ) : null}
                     </View>
                  </View>
                  <View style={formGroup}>
                     <Text style={label}>Summary</Text>
                     <Text style={summary}>{book.summary}</Text>
                  </View>
               </View>
               
               <Note {...this.props} bookId={bookId} />
            </View>
         </ScrollView>
      );
   }
}

const styles = StyleSheet.create({
   container: {

   },
   content: {
      padding: 10,
      backgroundColor: '#FFF'
   },
   label: {
      fontFamily: appFont,
      fontSize: 16,
      color: appColor
   },
   formGroup: {
      paddingTop: 15
   },
   inputGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   inputGroupItem: {
      flexDirection: 'row',
      justifyContent: 'center'
   },
   switchStyle: {
      position: 'absolute',
      left: 0,
      paddingVertical: 20
   },
   summary: {
      fontFamily: appFont
   }
});

