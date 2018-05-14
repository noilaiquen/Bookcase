import React, { Component } from 'react';
import {
   View,
   Text
} from 'react-native';
import { Button } from 'react-native-elements';
import Auth0 from 'react-native-auth0';
import { appColor, appTextColor } from '../config/constants';

const auth0 = new Auth0({
   clientId: 'B_DfmldbLz36_wFu1xx_U0A1JItf3kDP',
   domain: 'bookcase.auth0.com'
});

export default class App extends Component {
   constructor() {
      super();
      this.state = {
         accessToken: null
      };
      this.onSignIn = this.onSignIn.bind(this);
   }

   onSignIn = () => {
      auth0.webAuth
      .authorize({
        scope: 'openid profile',
        audience: 'https://bookcase.auth0.com/userinfo'
      })
      .then(credentials => {
        this.setState({ accessToken: credentials.accessToken });
      })
      .catch(error => console.log(error));
   }

   render() {
      return (
         <View style={styles.container}>
            <Button
               rounded  
               title="SIGN IN"
               backgroundColor={appTextColor} 
               buttonStyle={styles.buttonStyle}
               onPress={this.onSignIn}
            />
            {this.state.accessToken !== null &&
               (
               <Text style={{ color: '#FFF' }}>{`accessToken: ${this.state.accessToken}`}</Text>
               )
            }
         </View>
      );
   }
}

const styles = {
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: appColor
   },
   buttonStyle: {
      width: 200,
      height: 50
   } 
};
