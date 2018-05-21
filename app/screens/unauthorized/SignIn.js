import React, { Component } from 'react';
import {
   View,
   StatusBar,
   Alert,
   Text,
   Keyboard
} from 'react-native';
import { Button } from 'react-native-elements';
import { GoogleSignin } from 'react-native-google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { HeaderLeft, FormSignIn } from '../../components';
import { appColor, appFont } from '../../config/constants';
import googleSignInConfig from '../../config/googleSignConfig';
import firebase, { firebaseApp } from '../../config/firebaseConfig';

class SignIn extends Component {
   constructor(props) {
      super(props);
      this.state = {
         email: '',
         password: '',
         loading: false
      };

      this.googleSignIn = this.googleSignIn.bind(this);
      this.facebookSignIn = this.facebookSignIn.bind(this);
      this.setEmail = this.setEmail.bind(this);
      this.setPassword = this.setPassword.bind(this);
      this.signInEmailPassword = this.signInEmailPassword.bind(this);
   }

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
         this.setState({ loading: false }, () => Alert.alert('', 'Google service error!'));
      }
   }

   setEmail = (email) => {
      this.setState({
         email
      });
   }

   setPassword = (password) => {
      this.setState({
         password
      });
   }

   signInEmailPassword = async () => {
      Keyboard.dismiss();
      this.setState({ loading: true });

      const { email, password } = this.state;
      if (email === '' && password === '') {
         this.setState({ loading: false });
         Alert.alert('', 'Password or email is empty!');
         return;
      }

      try {
         await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (err) {
         let message;
         if (err.code === 'auth/invalid-email') {
            message = err.message;
         }
         if (err.code === 'auth/user-not-found') {
            message = 'User not exist.';
         }
         if (err.code === 'auth/wrong-password') {
            message = 'The password invalid.';
         }
         
         this.setState({ loading: false }, () => Alert.alert('', message));
      }
   }

   googleSignIn = async () => {
      try {
         this.setState({
            loading: true,
            error: false
         });
         const user = await GoogleSignin.signIn();
         const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken, user.accessToken);
         await firebaseApp.auth().signInWithCredential(credential);
      } catch (err) {
         // console.log('WRONG SIGNIN', err);
         this.setState({ loading: false }, () => Alert.alert('WRONG GOOGLE SIGN IN!'));
      }
   }

   facebookSignIn = async () => {
      try {
         const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
         if (result.isCancelled) {
            throw new Error('Please sign in before continue');
         }
         const tokenData = await AccessToken.getCurrentAccessToken();
         const token = tokenData.accessToken.toString();
         const credential = firebase.auth.FacebookAuthProvider.credential(token);
         await firebaseApp.auth().signInWithCredential(credential);
      } catch (err) {
         // console.log(err);
         this.setState({ loading: false }, () => Alert.alert('WRONG FACEBOOK SIGN IN!'));
      }
   }

   render() {
      return (
         <View style={styles.container}>
            <StatusBar barStyle="light-content" />   
            <HeaderLeft
               icon="md-close-circle"
               color="#FFF"
               onPress={() => this.props.navigation.goBack()}
            />

            <View style={styles.formContainer}>
               <FormSignIn
                  loading={this.state.loading}
                  onSignIn={this.signInEmailPassword}
                  setEmail={this.setEmail}
                  setPassword={this.setPassword}
               />
               <Button
                  loading={this.state.loading}
                  title="Sign in with google"
                  backgroundColor="#FFFFFF"
                  color="#4285f4"
                  icon={{ name: 'google', type: 'font-awesome', color: '#ea4335' }}
                  fontFamily={appFont}
                  buttonStyle={styles.buttonStyle}
                  onPress={this.googleSignIn}
               />
               <Button
                  loading={this.state.loading}
                  title="Sign in with facebook"
                  backgroundColor="#4267b2"
                  icon={{ name: 'facebook', type: 'font-awesome' }}
                  fontFamily={appFont}
                  buttonStyle={styles.buttonStyle}
                  onPress={this.facebookSignIn}
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
   },
   formContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   buttonStyle: {
      width: 300,
      height: 40,
      marginBottom: 5
   }
};

