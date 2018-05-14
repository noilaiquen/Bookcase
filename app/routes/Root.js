import {
   StackNavigator
} from 'react-navigation';
import Unauthorized from './Unauthorized';
import Authorized from './Authorized';

const Root = (isLogged) => (
   StackNavigator({
      Unauthorized: {
         screen: Unauthorized
      },
      Authorized: {
         screen: Authorized
      }
   }, {
      initialRouteName: isLogged ? 'Authorized' : 'Unauthorized',
      headerMode: 'none'
   })
);

export default Root;
