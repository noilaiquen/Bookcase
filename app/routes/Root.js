import { StackNavigator } from 'react-navigation';
import Unauthorized from './Unauthorized';
import Authorized from './Authorized';

const Root = () => (
   StackNavigator({
      Unauthorized: {
         screen: Unauthorized
      },
      Authorized: {
         screen: Authorized
      }
   }, {
      headerMode: 'none'   
   })
);

export default Root;
