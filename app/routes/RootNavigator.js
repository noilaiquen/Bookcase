import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import { initializeListeners } from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';
import { navigationPropConstructor } from '../utils';
import Unauthorized from './Unauthorized';
import Authorized from './Authorized';
import Splash from '../screens/Splash';

export const RootNavigator = createStackNavigator({ /* Auth flow */
   Splash: {
      screen: Splash
   },
   Unauthorized: {
      screen: Unauthorized
   },
   Authorized: {
      screen: Authorized
   }
}, {
   initialRouteName: 'Splash',
   headerMode: 'none'
});

class AppWithNavigationState extends Component {
   componentDidMount() {
      initializeListeners('root', this.props.nav);
   }

   render() {
      // console.log('----navigatorProps----', JSON.stringify(this.props.nav));
      return (
         <RootNavigator
            navigation={navigationPropConstructor(
               this.props.dispatch,
               this.props.nav,
            )}
         />
      );
   }
}

const mapStateToProps = ({ nav }) => ({ nav });

export default connect(mapStateToProps)(AppWithNavigationState);
