import React, { Component } from 'react';
import Authorized from './routes/Authorized';
import SignIn from './screens/SignIn';
import Container from './screens/Container';

console.ignoredYellowBox = [
   'Setting a timer'
];

export default class App extends Component {
   constructor() {
      super();
      this.state = {
         isLogged: true
      };
   }

   screenShouldRender() {
      const { isLogged } = this.state;
      if (isLogged) {
         return <Authorized />;
      }
      return <SignIn />;
   }

   render() {
      return (
         <Container>
            {this.screenShouldRender()}
         </Container>
      );
   }
}
