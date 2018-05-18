import { StackNavigator } from 'react-navigation';
import Main from '../screens/unauthorized/Main';
import SignIn from '../screens/unauthorized/SignIn';

const Unauthorized = StackNavigator({
   MainUnauthorized: {
      screen: Main
   },
   SignIn: {
      screen: SignIn
   }
}, {
   initialRouteName: 'MainUnauthorized',
   headerMode: 'none'
});

export default Unauthorized;
