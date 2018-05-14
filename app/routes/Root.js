import { StackNavigator } from 'react-navigation';
// import Unauthorized from './Unauthorized';
import Authorized from './Authorized';
import SignIn from '../screens/SignIn';

const Root = StackNavigator({
   Unauthorized: {
      screen: SignIn
   },
   Authorized: {
      screen: Authorized
   }
}, {
   initialRouteName: 'Unauthorized',
   headerMode: 'none'
});

export default Root;
