import React, { Component } from 'react';
import {
   StyleSheet,
   ScrollView,
   View,
   Image,
   Switch,
   TouchableOpacity,
   Text,
   ToastAndroid,
   DeviceEventEmitter
} from 'react-native';
import { FormLabel, FormInput, Button, Icon } from 'react-native-elements';
import moment from 'moment';
import Header from '../components/Header';
import Picker from '../api/Picker';
import DatePicker from '../api/DatePicker';
import noImage from '../assets/no-image.png';
import Upload from '../api/Upload';
import global from '../config/global';
import { firebaseApp } from '../config/firebaseConfig';
import { appTextColor, darkColor, appFont } from '../config/constants';

const currentDate = moment().format('YYYY-MM-DD');
const defaultThumbnail = 'https://firebasestorage.googleapis.com/v0/b/bookcase-d1e17.appspot.com/o/thumbnail%2FNo_book_cover_lg.jpg?alt=media&token=18f98f4f-1cfa-4610-b6db-bd7478849a20';

const initState = {
   title: '',
   author: '',
   page: 0,
   isFinished: false,
   dateFinished: currentDate,
   imageSource: null
};

export default class Edit extends Component {
   static navigationOptions = {
      header: null
   };

   constructor(props) {
      super(props);
      this.state = initState;
      this.ref = firebaseApp.database().ref('bookcase');

      this.onUpload = this.onUpload.bind(this);
      this.chooseImage = this.chooseImage.bind(this);
      this.onRemoveImage = this.onRemoveImage.bind(this);
   }

   onUpload = async () => {
      const { title, author, isFinished, dateFinished, page, imageSource } = this.state;
      global.setLoadingVisible(true);

      if (title === '' || author === '') {
         global.setLoadingVisible(false);
         ToastAndroid.show('Title and Author is required!', ToastAndroid.SHORT);
         return;
      }

      let thumbnail = null;
      if (imageSource !== null) {
         try {
            const imageURL = await Upload(imageSource.uri);
            thumbnail = imageURL;
         } catch (error) {
            console.log('upload image failed!');
         }
      }

      const dataPost = {
         title,
         author,
         rating: 0,
         is_finished: isFinished,
         date_finished: isFinished ? dateFinished : null,
         page: Number(page),
         thumbnail: thumbnail !== null ? thumbnail : defaultThumbnail
      };

      try {
         await this.ref.push(dataPost);
         this.setState(initState, () => {
            global.setLoadingVisible(false);
            ToastAndroid.show('Add successfully!', ToastAndroid.SHORT);
            DeviceEventEmitter.emit('refreshBookcase');
         });
      } catch (error) {
         global.setLoadingVisible(false);
         ToastAndroid.show('Somethings were wrong!', ToastAndroid.SHORT);
      }
   }

   onRemoveImage = () => {
      this.setState({ imageSource: null });
   }

   chooseImage = () => {
      Picker((source, dataBase64) => this.setState({
         imageSource: source,
         dataBase64
      }));
   }

   render = () => {
      const { 
         container, labelStyle, inputStyle, 
         button, image, scrollview, 
         switchStyle, removeImage,
         textRemoveImage, inputGroup, inputGroupItem } = styles;
      const { imageSource, title, author, isFinished, dateFinished, page } = this.state;
      return (
         <View style={container}>
            <ScrollView contentContainerStyle={scrollview}>
               <Header centerComponent={{ text: 'bookcase' }} />   
               <View style={{ height: 15 }} />
               <TouchableOpacity onPress={this.chooseImage}>
                  <Image 
                     style={image}
                     source={imageSource !== null ? imageSource : noImage} 
                  />
               </TouchableOpacity>
               {
                  imageSource !== null ? (
                     <TouchableOpacity style={removeImage} onPress={this.onRemoveImage}>
                        <Text style={textRemoveImage}>REMOVE</Text>
                     </TouchableOpacity>
                  ) : null
               }
               <View>
                  <FormLabel labelStyle={labelStyle}>Title</FormLabel>
                  <FormInput
                     ref={(input) => this.titleInput = input}  //eslint-disable-line   
                     inputStyle={inputStyle}
                     value={title}
                     onChangeText={text => this.setState({ title: text })}
                     placeholder="Enter book title..."
                     underlineColorAndroid="rgba(0,0,0,0)"
                     placeholderTextColor="#BDBDBD"
                     returnKeyType="next"
                     onSubmitEditing={() => this.authorInput.focus()}
                  />
               </View>
               <View>
                  <FormLabel labelStyle={labelStyle}>Author</FormLabel>
                  <FormInput
                     ref={(input) => this.authorInput = input}  //eslint-disable-line  
                     inputStyle={inputStyle}
                     value={author}
                     onChangeText={text => this.setState({ author: text })}
                     placeholder="Enter book author..."
                     underlineColorAndroid="rgba(0,0,0,0)"
                     placeholderTextColor="#BDBDBD"
                     keyboardType="email-address"
                     returnKeyType="next"
                     onSubmitEditing={() => this.pageInput.focus()}
                  />
               </View>
               <View>
                  <FormLabel labelStyle={labelStyle}>Page</FormLabel>
                  <FormInput
                     ref={(input) => this.pageInput = input}  //eslint-disable-line   
                     inputStyle={inputStyle}
                     value={page.toString()}
                     keyboardType="numeric"
                     onChangeText={text => this.setState({ page: text })}
                     placeholder="Enter total page..."
                     underlineColorAndroid="rgba(0,0,0,0)"
                     placeholderTextColor="#BDBDBD"
                     returnKeyType="next"
                  />
               </View>
               <View style={inputGroup}>
                  <View>
                     <FormLabel labelStyle={labelStyle}>Finished Book</FormLabel>
                     <Switch
                        onValueChange={() =>
                           this.setState({ isFinished: !this.state.isFinished })
                        }
                        value={this.state.isFinished}
                        style={switchStyle}
                        onTintColor={appTextColor}
                        thumbTintColor={this.state.isFinished ? appTextColor : '#eee'}
                     />
                  </View>
                  {isFinished ? (
                     <View>
                        <FormLabel labelStyle={labelStyle}>Date Finished</FormLabel>
                        <TouchableOpacity
                           style={inputGroupItem}
                           onPress={
                              () => DatePicker(date => this.setState({ dateFinished: date }))
                           }
                        >
                           <Icon
                              name="md-calendar"
                              type="ionicon"
                              size={20}
                              color={appTextColor}
                           />
                           <Text>{` ${dateFinished}`}</Text>
                        </TouchableOpacity>
                     </View>
                  ) : null }
               </View>   
               <View>
                  <Button
                     onPress={this.onUpload}
                     containerViewStyle={{ marginTop: 50 }}   
                     buttonStyle={button}
                     fontFamily={appFont}
                     fontSize={16}
                     title="ADD BOOK"
                  />
               </View>
            </ScrollView>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#FFF',
      position: 'relative'
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
      paddingBottom: 2
   },
   button: {
      backgroundColor: appTextColor,
      height: 40 
   },
   image: {
      marginHorizontal: 15,
      width: 120,
      height: 150,
      resizeMode: 'cover'
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
   }
});

