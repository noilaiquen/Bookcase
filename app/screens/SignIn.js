import React, { Component } from 'react';
import {
   View,
   Text,
   Image
} from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import Auth0 from 'react-native-auth0';
import { appColor, appTextColor, appFont } from '../config/constants';
import auth0Credentials from '../config/auth0-credentials';
import global from '../config/global';
import logo from '../assets/logo.png';

const auth0 = new Auth0(auth0Credentials);

export default class App extends Component {
   constructor() {
      super();
      this.state = {
         error: false
      };
      this.onSignIn = this.onSignIn.bind(this);
   }

   onSignIn = async () => {
      try {
         const credentials = await auth0.webAuth.authorize({
            scope: 'openid profile email',
            audience: 'https://bookcase.auth0.com/userinfo'
         });
         global.accessToken = credentials.accessToken;

         const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
               NavigationActions.navigate({ routeName: 'Authorized' })
            ],
         });
         this.props.navigation.dispatch(resetAction);
      } catch (error) {
         console.log(error);
         this.setState({ error: true });
      }
   }

   render() {
      return (
         <View style={styles.container}>
            <View style={styles.logoContainer}>
               <Text style={styles.logoText}>BOOCASE</Text>   
               <Image
                  source={logo}
                  style={styles.logoImage}
                  resizeMode="contain"
               /> 
            </View>

            <View style={styles.buttonContainer}>            
               <Button
                  title="SIGN IN"
                  backgroundColor={appTextColor} 
                  buttonStyle={styles.buttonStyle}
                  onPress={this.onSignIn}
               />
            </View>   
         </View>
      );
   }
}

const styles = {
  container: {
      flex: 1,
      backgroundColor: appColor
   },
   logoContainer: {
      flex: 3,
      alignItems: 'center',
      justifyContent: 'center'
   },
   logoText: {
      fontFamily: appFont,
      color: '#FFF',
      fontSize: 20
   },
   logoImage: {
      width: 300,
      height: 300
   },
   buttonContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
   },
   buttonStyle: {
      width: 300,
      height: 50
   } 
};
