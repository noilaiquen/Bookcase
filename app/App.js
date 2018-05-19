import React, { Component } from 'react';
import Root from './routes/Root';
import Container from './screens/Container';
import Splash from './screens/Splash';
import { firebaseApp } from './config/firebaseConfig';
import global from './config/global';

console.ignoredYellowBox = [
   'Setting a timer'
];

export default class App extends Component {
   state = {
      authenticated: false,
      loading: true
   };
   /**
   * When the App component mounts, we listen for any authentication
   * state changes in Firebase.
   * Once subscribed, the 'user' parameter will either be null 
   * (logged out) or an Object (logged in)
   */
   componentDidMount() {
      this.authSubscription = firebaseApp.auth().onAuthStateChanged(user => {
         if (user) {
            this.setState({
               authenticated: true,
               loading: false
            }, () => { global.user = user; });
         } else {
            this.setState({ 
               loading: false,
               authenticated: false,
            });
         }
      });
   }

   /**
   * Don't forget to stop listening for authentication state changes
   * when the component unmounts.
   */
   componentWillUnmount() {
      this.authSubscription();
   }

   render() {
      const Screen = Root(this.state.authenticated);
      if (this.state.loading) {
         return <Splash />;
      }

      return (
         <Container>
            <Screen />
         </Container>
      );
   }
}
