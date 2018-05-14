import { StackNavigator } from 'react-navigation';
import SignIn from '../screens/SignIn';

const Unauthorized = StackNavigator({
   SignIn: {
      screen: SignIn
   }
}, {
   headerMode: 'none'
});

export default Unauthorized;
