import React, { Component } from 'react';
import { RootNavigator } from './routes/Router';
import Container from './screens/Container';

console.ignoredYellowBox = [
   'Setting a timer'
];

export default class App extends Component {
   render() {
      const Screen = RootNavigator();
      return (
         <Container>
            <Screen />
         </Container>
      );
   }
}
