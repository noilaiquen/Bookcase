import React, { Component } from 'react';
import {
   Text,
   View,
   ActivityIndicator,
   Image
} from 'react-native';
import { Button } from 'react-native-elements';
import { Header } from '../../components';
import { firebaseApp } from '../../config/firebaseConfig';
import global from '../../config/global';
import { appTextColor, appFont } from '../../config/constants';

export default class Profile extends Component {
   static navigationOptions = () => ({
      header: () => (
         <Header
            centerComponent={{
               text: 'bookcase',
            }}
         />
      )
   })

   constructor(props) {
      super(props);
      this.state = {
         user: null
      };
      this.signOut = this.signOut.bind(this);
   }

   componentDidMount() {
      this.setState({
         user: global.user
      });
   }

   signOut = async () => {
      try {
         await firebaseApp.auth().signOut();
      } catch (error) {
         console.log('Sign out error: ', error);
      } 
   }
   
   render() {
      const { user } = this.state;
      if (user === null) {
         return (
            <View style={styles.loadingContainer}>
               <ActivityIndicator
                  size="small"
                  color={appTextColor}
               />
            </View>
         );
      }
      return (
         <View style={styles.container}>
            <Image 
               style={styles.avatar}
               resizeMode="contain"
               source={{ uri: user.photoURL }} 
            />
            <Text style={styles.name}>{user.displayName}</Text>
            <Text style={styles.email}>{user.email}</Text>

            <View style={styles.buttons}>
               <Button
                  title="Sign out"
                  fontFamily={appFont}
                  buttonStyle={styles.buttonSignOut}
                  backgroundColor={appTextColor}
                  onPress={this.signOut}
               />
            </View>
         </View>
      );
   }
}

const styles = {
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF',
   },
   loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF',
   },
   name: {
      fontSize: 20,
      margin: 10,
      fontFamily: appFont,
      color: appTextColor
   },
   email: {
      fontSize: 18,
      fontFamily: appFont,
   },
   buttons: {
      marginTop: 20
   },
   buttonSignOut: {
      width: 300,
      height: 40
   },
   avatar: {
      width: 100,
      height: 100,
      borderRadius: 50
   }
};

