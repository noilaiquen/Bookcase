import React, { Component } from 'react';
import Root from './routes/Root';
import Container from './screens/Container';

console.ignoredYellowBox = [
   'Setting a timer'
];

export default class App extends Component {
   render() {
      const Screen = Root();
      return (
         <Container>
            <Screen />
         </Container>
      );
   }
}
