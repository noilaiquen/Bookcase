import React, { Component } from 'react';
import { AppRegistry, YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import App from './app/App';
import store from './app/store';

console.ignoredYellowBox = [
   'Setting a timer'
];
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

class Bookcase extends Component {
   render() {
      return (
         <Provider store={store}>
            <App />
         </Provider>
      );
   }
}

AppRegistry.registerComponent('Bookcase', () => Bookcase);
