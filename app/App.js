import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppWithNavigationState from './routes/RootNavigator';
import Container from './screens/Container';
import { AuthStatus } from './actions/Auth';
import { watchConnection, keyboardShow, keyboardHide } from './actions/App';
import {
   alertExit,
   watchConnectionChange,
   removeConnectionChangeListener,
   handleAndroidBackButton,
   removeHandlerAndroidBackButton,
   keyboardDidShowListener,
   keyboardDidHideListener,
   removeKeyboardDidShowListener,
   removeKeyboardDidHideListener
} from './utils';

class App extends Component {
   componentWillMount() {
      const { actions } = this.props;

      watchConnectionChange(isConnected => actions.watchConnection(isConnected));
      handleAndroidBackButton(alertExit);
      keyboardDidShowListener(actions.keyboardShow);
      keyboardDidHideListener(actions.keyboardHide);
   }

   componentDidMount() {
      const { actions } = this.props;
      actions.AuthStatus();
   }

   componentWillUnmount() {
      removeConnectionChangeListener();
      removeHandlerAndroidBackButton(alertExit);
      removeKeyboardDidShowListener();
      removeKeyboardDidHideListener();
   }

   // onBackPress = () => {
      // const { dispatch, nav } = this.props;
      // console.log('------------', this.findRouteNameFromNavigatorState(nav));
      // if (nav.index === 1 || nav.index === 2) {
      //    alertExit();
      //    return true;
      // }
      // return false;
      // dispatch(NavigationActions.back());
      // return true;
      // this.props.navigation.goBack();
   // };

   // findRouteNameFromNavigatorState({ routes }) {
   //    let route = routes[routes.length - 1];
   //    while (route.index !== undefined) route = route.routes[route.index];
   //    // return route.routeName;
   //    return route;
   // }

   render() {
      return (
         <Container>
            <AppWithNavigationState />
         </Container>
      );
   }
}

const mapStateToProps = ({ auth, nav }) => ({
   isLoading: auth.isLoading,
   user: auth.user,
   isLoggedIn: auth.isLoggedIn,
   nav
});

const mapDispatchToProps = dispatch => ({
   actions: bindActionCreators({ 
      AuthStatus,
      watchConnection,
      keyboardShow,
      keyboardHide
   }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
