import { StackNavigator } from 'react-navigation';
import Main from '../screens/unauthorized/Main';
import SignIn from '../screens/unauthorized/SignIn';
import SignUp from '../screens/unauthorized/SignUp';

const Unauthorized = StackNavigator({
   Main: {
      screen: Main
   },
   SignIn: {
      screen: SignIn
   },
   SignUp: {
      screen: SignUp
   }
}, {
   initialRouteName: 'Main',
   headerMode: 'none'
});

export default Unauthorized;
