import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements'; 
import Auth0 from 'react-native-auth0';
import { appColor, appTextColor } from '../config/constants';

const auth0 = new Auth0({
   domain: 'bookcase.auth0.com',
   clientId: 'B_DfmldbLz36_wFu1xx_U0A1JItf3kDP'
});

export default class SignIn extends Component {
   constructor() {
      super();
      this.onSignIn = this.onSignIn.bind(this);
   }

   onSignIn = () => {
      auth0.webAuth
      .authorize({
        scope: 'openid profile',
        audience: 'https://bookcase.auth0.com/userinfo'
      })
      .then(credentials => {
        console.log(credentials);
      })
      .catch(error => console.log(error));
   }

   render() {
      return (
         <View
            style={{
               flex: 1,
               justifyContent: 'center',
               alignItems: 'center',
               backgroundColor: appColor
            }}
         >
            <Button
               rounded   
               title="Sign in"
               buttonStyle={{ width: 200 }}
               backgroundColor={appTextColor}
               onPress={this.onSignIn}
            />
         </View>
      );
   }
}
