import React, { Component } from 'react';
import {
   View,
   StatusBar
} from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { HeaderLeft } from '../../components';
import { appColor } from '../../config/constants';
import googleSignInConfig from '../../config/googleSignConfig';

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
         console.log('Play services error', err.code, err.message);
      }
   }

   googleSignIn = async () => {
      try {
         const user = await GoogleSignin.signIn();
         console.log(user);
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

