import React, { Component } from 'react';
// import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppWithNavigationState from './routes/RootNavigator';
import Container from './screens/Container';
import { AuthStatus } from './actions/Auth';
import { watchConnection, keyboardShow, keyboardHide } from './actions/App';
import * as utils from './utils';

class App extends Component {
   componentWillMount() {
      const { actions } = this.props;
      utils.connectionListener(isConnected => actions.watchConnection(isConnected));
      utils.androidBackButtonListener(alertExit);
      utils.keyboardDidShowListener(actions.keyboardShow);
      utils.keyboardDidHideListener(actions.keyboardHide);
   }

   componentDidMount() {
      this.props.actions.AuthStatus();
   }

   componentWillUnmount() {
      utils.removeConnectionListener();
      utils.removeAndroidBackButtonListener(alertExit);
      utils.removeKeyboardDidShowListener();
      utils.removeKeyboardDidHideListener();
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

const mapStateToProps = ({ nav }) => ({
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
