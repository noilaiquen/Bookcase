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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon, Rating } from 'react-native-elements';
import { Header, BookOverview, Note } from '../../components';
import { appTextColor, darkColor, appFont, appColor } from '../../config/constants';
import {
   fetchBookById,
   changeBookInfo,
   updateBookInfo,
   deleteBook
} from '../../actions/Book';
import {
   DatePicker
} from '../../utils';

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

class ViewBook extends Component {
   constructor(props) {
      super(props);
   }

   componentDidMount() {
      const { bookId } = this.props.navigation.state.params;
      const { actions } = this.props;
      actions.fetchBookById(bookId);
   }

   onRemove = () => {
      const { bookId } = this.props.navigation.state.params;
      const { actions } = this.props;
      Alert.alert('', 'Delete this book?',
         [
            {
               text: 'Cancel',
               onPress: () => null,
               style: 'cancel'
            },
            {
               text: 'Yes! Delete it.',
               onPress: () => actions.deleteBook(bookId)
            }
         ],
         { cancelable: false }
      );
   }

   render() {
      const {
         content, inputGroup, label, inputGroupItem,
         formGroup, switchStyle, container, summary
      } = styles;
      const { bookInfo, actions, isLoading } = this.props;

      if (bookInfo === null) {
         return null;
      }
      
      return (
         <ScrollView>
            <HeaderScreen
               {...this.props}
               onRemove={() => this.onRemove()}
               goBack={() => actions.updateBookInfo()}
            />

            <View style={container}>
               <View style={content}>
                  <BookOverview book={bookInfo} />

                  <View style={formGroup}>
                     <Text style={label}>{`Rate ${bookInfo.rating}`}</Text>   
                     <Rating
                        type='heart'
                        fractions={1}
                        startingValue={bookInfo.rating}
                        imageSize={30}
                        onFinishRating={rating => actions.changeBookInfo({ rating })}
                     />
                  </View>

                  <View style={formGroup}>
                     <View style={inputGroup}>
                        <View style={{ height: 50 }}>   
                           <Text style={label}>Finished Book</Text>
                           <Switch
                              onValueChange={() =>
                                 actions.changeBookInfo({
                                    is_finished: !bookInfo.is_finished
                                 })
                              }
                              value={bookInfo.is_finished}
                              style={switchStyle}
                              onTintColor={appTextColor}
                              thumbTintColor={bookInfo.is_finished ? appTextColor : darkColor}
                           />
                        </View>
                        {bookInfo.is_finished ? (
                           <View>
                              <Text style={label}>Date Finished</Text>
                              <TouchableOpacity
                                 style={inputGroupItem}
                                 onPress={() => DatePicker(date => actions.changeBookInfo({ date_finished: date }))}
                              >
                                 <Icon
                                    name="md-calendar"
                                    type="ionicon"
                                    size={20}
                                    color={appTextColor}
                                 />
                                 <Text style={summary}>{` ${bookInfo.date_finished}`}</Text>
                              </TouchableOpacity>
                           </View>
                        ) : null}
                     </View>
                  </View>
                  <View style={formGroup}>
                     <Text style={label}>Summary</Text>
                     <Text style={summary}>{bookInfo.summary}</Text>
                  </View>
               </View>
               
               { !isLoading && (
                  <Note {...this.props} bookId={bookInfo.bookId} />
               )}
            </View>
         </ScrollView>
      );
   }
}

ViewBook.propTypes = {
   bookInfo: PropTypes.object,
   isLoading: PropTypes.bool.isRequired,
   actions: PropTypes.objectOf(PropTypes.func)
};

const mapStatetoProps = ({ book, app }) => ({
   bookInfo: book.bookInfo,
   isLoading: app.isLoading
});

const mapDispatchtoProps = dispatch => ({
   actions: bindActionCreators({
      fetchBookById,
      changeBookInfo,
      updateBookInfo,
      deleteBook
   }, dispatch)
});

export default connect(mapStatetoProps, mapDispatchtoProps)(ViewBook);

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

