import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
   View,
  Button
} from 'react-native';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({
   clientId: "B_DfmldbLz36_wFu1xx_U0A1JItf3kDP",
   domain: "bookcase.auth0.com"
});

type Props = {};
export default class App extends Component<Props> {
   constructor() {
      super();
      this.login = this.login.bind(this);
   }

   login = () => {
      auth0.webAuth
      .authorize({
        scope: 'openid profile',
        audience: 'https://bookcase.auth0.com/userinfo'
      })
      .then(credentials => {
        this.setState({ accessToken: credentials.accessToken }, () => console.log(credentials));
      })
      .catch(error => console.log(error));
   }

  render() {
    return (
      <View style={styles.container}>
          <Button
            title="login"
            onPress={this.login}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
