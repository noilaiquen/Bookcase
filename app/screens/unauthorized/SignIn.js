import React, { Component } from 'react';
import {
   View,
   StatusBar,
   Alert
} from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { HeaderLeft } from '../../components';
import { appColor } from '../../config/constants';
import googleSignInConfig from '../../config/googleSignConfig';
import firebase, { firebaseApp } from '../../config/firebaseConfig';

class SignIn extends Component {
   componentDidMount() {
      this.setupGoogleSignin();
   }

   setupGoogleSignin = async () => {
      try {
         await GoogleSignin.hasPlayServices({ autoResolve: true });
         await GoogleSignin.configure({
            webClientId: googleSignInConfig.webClientId,
            offlineAccess: false
         });
      } catch (err) {
         Alert.alert(
            'Error!',
            'Google service error!',
            [{ text: 'OK', onPress: () => null }]
         );
      }
   }

   googleSignIn = async () => {
      try {
         const user = await GoogleSignin.signIn();
         const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken, user.accessToken);
         await firebaseApp.auth().signInWithCredential(credential);
      } catch (err) {
         console.log('WRONG SIGNIN', err);
      }
   }

   render() {
      return (
         <View style={styles.container}>
            <StatusBar barStyle="light-content" />   
            <HeaderLeft
               icon="ios-arrow-back"
               text="Back"
               color="#FFF"
               onPress={() => this.props.navigation.goBack()}
            />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
               <GoogleSigninButton
                  style={{ width: 312, height: 48 }}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Light}
                  onPress={() => this.googleSignIn()}
               />
            </View>
         </View>
      );
   }
}

export default SignIn;

const styles = {
   container: {
      flex: 1,
      backgroundColor: appColor,
      paddingHorizontal: 10,
      paddingTop: 25
   }
};

