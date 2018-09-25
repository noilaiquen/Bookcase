import React, { Component } from 'react';
import {
   ScrollView,
   View,
   Image,
   Switch,
   TouchableOpacity,
   Text,
   TextInput
} from 'react-native';
import PropTypes from 'prop-types';
import {
   FormLabel,
   FormInput,
   Button,
   Icon,
   SearchBar
} from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { SearchList } from '../../components';
import { Picker, DatePicker } from '../../utils';
import noCover from '../../assets/no_cover.jpg';
import { appTextColor, darkColor, appFont } from '../../config/constants';
import {
   googleBookSearch,
   setBookInfo,
   onSelectSearchResult,
   onRemoveImage,
   onUpload
} from '../../actions/Add';

class Add extends Component {
   constructor(props) {
      super(props);
      this.chooseImage = this.chooseImage.bind(this);
   }

   chooseImage = () => {
      const { actions } = this.props;
      Picker((source, dataBase64) => {
         actions.setBookInfo({
            imageSource: source,
            dataBase64
         });
      });
   }

   render() {
      const { actions, add } = this.props;
      const { 
         imageSource, title, author,
         isFinished, dateFinished, page,
         summary, thumbnail, googleSearch,
         isGoogleSearch
      } = add;

      const thumb = thumbnail !== null ? { uri: thumbnail } : imageSource;

      return (
         <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollview}>
               <SearchBar
                  lightTheme
                  onChangeText={text => actions.googleBookSearch(text)}
                  placeholder='Search google book'
                  containerStyle={styles.searchContainer}
                  inputStyle={styles.searchInput}
               />

                {isGoogleSearch && (
                  <SearchList
                     onSelect={actions.onSelectSearchResult}   
                     data={googleSearch}
                  />
               )} 

               <View style={{ height: 15 }} />

               <TouchableOpacity onPress={this.chooseImage}>
                  <Image 
                     style={styles.image}
                     source={thumb !== null ? thumb : noCover} 
                  />
               </TouchableOpacity>

               {imageSource !== null && (
                  <TouchableOpacity
                     style={styles.removeImage}
                     onPress={actions.onRemoveImage}
                  >
                     <Text style={styles.textRemoveImage}>REMOVE</Text>
                  </TouchableOpacity>
               )}

               <View>
                  <FormLabel labelStyle={styles.labelStyle}>Title</FormLabel>
                  <FormInput
                     ref={(input) => this.titleInput = input}  //eslint-disable-line   
                     inputStyle={styles.inputStyle}
                     value={title}
                     onChangeText={text => actions.setBookInfo({ title: text })}
                     placeholder="Enter book title..."
                     placeholderTextColor="#BDBDBD"
                     returnKeyType="next"
                     onSubmitEditing={() => this.authorInput.focus()}
                  />
               </View>

               <View>
                  <FormLabel labelStyle={styles.labelStyle}>Author</FormLabel>
                  <FormInput
                     ref={(input) => this.authorInput = input}  //eslint-disable-line  
                     inputStyle={styles.inputStyle}
                     value={author}
                     onChangeText={text => actions.setBookInfo({ author: text })}
                     placeholder="Enter book author..."
                     placeholderTextColor="#BDBDBD"
                     returnKeyType="next"
                     onSubmitEditing={() => this.pageInput.focus()}
                  />
               </View>

               <View>
                  <FormLabel labelStyle={styles.labelStyle}>Page</FormLabel>
                  <FormInput
                     ref={(input) => this.pageInput = input}  //eslint-disable-line   
                     inputStyle={styles.inputStyle}
                     value={page.toString()}
                     keyboardType="numeric"
                     onChangeText={text => actions.setBookInfo({ page: text })}
                     placeholder="Enter total page..."
                     placeholderTextColor="#BDBDBD"
                     returnKeyType="next"
                     onSubmitEditing={() => this.summaryInput.focus()}
                  />
               </View>

               <View>
                  <FormLabel labelStyle={styles.labelStyle}>Summary</FormLabel>
                  <View style={styles.textareaContainer}>
                     <TextInput
                        multiline
                        numberOfLines={4}
                        value={summary}
                        placeholder="Enter summary..."
                        placeholderTextColor="#BDBDBD"
                        style={styles.textarea}
                        ref={(input) => this.summaryInput = input}  //eslint-disable-line  
                        onChangeText={text => actions.setBookInfo({ summary: text })}
                     />
                  </View>
               </View>

               <View style={styles.inputGroup}>
                  <View>
                     <FormLabel labelStyle={styles.labelStyle}>Finished Book</FormLabel>
                     <Switch
                        onValueChange={() => actions.setBookInfo({ isFinished: !isFinished })}
                        value={isFinished}
                        style={styles.switchStyle}
                        onTintColor={appTextColor}
                        thumbTintColor={isFinished ? appTextColor : '#eee'}
                     />
                  </View>
                  
                  {isFinished && (
                     <View>
                        <FormLabel labelStyle={styles.labelStyle}>Date Finished</FormLabel>
                        <TouchableOpacity
                           style={styles.inputGroupItem}
                           onPress={() => DatePicker(date => actions.setBookInfo({ dateFinished: date }))}
                        >
                           <Icon
                              name="md-calendar"
                              type="ionicon"
                              size={20}
                              color={appTextColor}
                           />
                           <Text style={{ fontFamily: appFont }}>{` ${dateFinished}`}</Text>
                        </TouchableOpacity>
                     </View>
                  )}
               </View>
               
               <View>
                  <Button
                     title="Add book"
                     onPress={actions.onUpload}
                     containerViewStyle={{ marginTop: 50 }}
                     buttonStyle={styles.buttonStyle}
                     backgroundColor={appTextColor}
                     fontFamily={appFont}
                  />
               </View>
            </ScrollView>
         </View>
      );
   }
}

Add.propTypes = {
   add: PropTypes.object,
   uid: PropTypes.string.isRequired,
   actions: PropTypes.objectOf(PropTypes.func)
};

const mapDispatchToProps = dispatch => ({
   actions: bindActionCreators({
      googleBookSearch,
      setBookInfo,
      onSelectSearchResult,
      onRemoveImage,
      onUpload
   }, dispatch)
});

const mapStateToProps = ({ auth, add }) => {
   const { user } = auth;
   return {
      uid: user.uid,
      add
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Add);

const styles = {
   container: {
      flex: 1,
      backgroundColor: '#FFF'
   },
   scrollview: {
      paddingBottom: 15
   },
   labelStyle: {
      color: darkColor,
      fontFamily: appFont,
      fontWeight: '100',
      fontSize: 16,
   },
   inputStyle: {
      borderBottomColor: darkColor,
      borderBottomWidth: 1,
      paddingBottom: 2,
      fontFamily: appFont
   },
   textarea: {
      fontFamily: appFont,
      color: darkColor
   },
   buttonStyle: {
      alignSelf: 'center',
      height: 40,
      width: 300
   },
   image: {
      marginHorizontal: 15,
      width: 80,
      height: 100,
      resizeMode: 'contain'
   },
   switchStyle: {
      position: 'absolute',
      left: 15,
      paddingVertical: 40
   },
   removeImage: {
      paddingVertical: 15,
      marginHorizontal: 15,
      width: 100
   },
   textRemoveImage: {
      fontSize: 16,
      color: appTextColor
   },
   inputGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   inputGroupItem: {
      flexDirection: 'row',
      justifyContent: 'center'
   },
   textareaContainer: {
      backgroundColor: '#FFF',
      borderColor: darkColor,
      borderRadius: 5,
      borderWidth: 1,
      marginHorizontal: 15
   },
   searchContainer: {
      backgroundColor: '#FFF',
      marginHorizontal: 15,
      borderTopWidth: 0,
      borderBottomWidth: 1,
      borderColor: darkColor,
   },
   searchInput: {
      backgroundColor: '#FFF',
      fontFamily: appFont
   }
};

