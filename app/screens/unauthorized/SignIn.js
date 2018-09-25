import React, { Component } from 'react';
import {
   View,
   StatusBar,
   Alert,
   Keyboard,
   BackHandler
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-native-elements';
import { GoogleSignin } from 'react-native-google-signin';
import { HeaderLeft, FormSignIn } from '../../components';
import { appColor, appFont } from '../../config/constants';
import googleSignInConfig from '../../config/googleSignConfig';
import { loginWithEmailPassword, loginWithGoogle, loginWithFacebook } from '../../actions/Auth';

class SignIn extends Component {
   constructor(props) {
      super(props);
      this.state = {
         email: '',
         password: ''
      };

      this.setEmail = this.setEmail.bind(this);
      this.setPassword = this.setPassword.bind(this);
      this.signInEmailPassword = this.signInEmailPassword.bind(this);
   }

   componentDidMount() {
      this.setupGoogleSignin();
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.error !== null) {
         Alert.alert(null, nextProps.error);
      }
   }

   shouldComponentUpdate(nextProps) {
      if (nextProps.isLoading !== this.props.isLoading) {
         return true;
      }
      return false;
   }

   setupGoogleSignin = async () => {
      try {
         await GoogleSignin.hasPlayServices({ autoResolve: true });
         await GoogleSignin.configure({
            webClientId: googleSignInConfig.webClientId,
            offlineAccess: false
         });
      } catch (err) {
         Alert.alert(null, 'Google service error!', [
            { text: 'OK', onPress: () => BackHandler.exitApp() },
         ]);
      }
   }

   setEmail = (email) => {
      this.setState({ email });
   }

   setPassword = (password) => {
      this.setState({ password });
   }

   signInEmailPassword = () => {
      Keyboard.dismiss();
      const { loginEmailPassword } = this.props;
      const { email, password } = this.state;
      if (email === '' && password === '') {
         Alert.alert(null, 'Password or email is empty!');
         return;
      }
      loginEmailPassword(email, password);
   }

   render() {
      const { isLoading, loginFacebook, loginGoogle } = this.props;
      return (
         <View style={styles.container}>
            <StatusBar barStyle="light-content" />   
            <HeaderLeft
               icon="md-close-circle"
               color="#FFF"
               onPress={() => this.props.navigation.goBack()}
            />

            <View style={styles.formContainer}>
               <FormSignIn
                  loading={isLoading}
                  onSignIn={this.signInEmailPassword}
                  setEmail={this.setEmail}
                  setPassword={this.setPassword}
               />
               <Button
                  title="Sign in with google"
                  backgroundColor="#FFFFFF"
                  color="#4285f4"
                  icon={{ name: 'google', type: 'font-awesome', color: '#ea4335' }}
                  fontFamily={appFont}
                  buttonStyle={styles.buttonStyle}
                  onPress={() => loginGoogle()}
               />
               <Button
                  title="Sign in with facebook"
                  backgroundColor="#4267b2"
                  icon={{ name: 'facebook', type: 'font-awesome' }}
                  fontFamily={appFont}
                  buttonStyle={styles.buttonStyle}
                  onPress={() => loginFacebook()}
               />
            </View>
         </View>
      );
   }
}

SignIn.propTypes = {
   isLoading: PropTypes.bool,
   error: PropTypes.string,
   loginEmailPassword: PropTypes.func.isRequired,
   loginGoogle: PropTypes.func.isRequired,
   loginFacebook: PropTypes.func.isRequired
};

SignIn.defaultProps = {
   isLoading: false,
   error: null,
};

const mapStateToProps = ({ auth }) => ({
   isLoading: auth.isLoading,
   error: auth.error
});

const mapDispatchToProps = dispatch => (
   bindActionCreators({
      loginEmailPassword: loginWithEmailPassword,
      loginGoogle: loginWithGoogle,
      loginFacebook: loginWithFacebook
   }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

const styles = {
   container: {
      flex: 1,
      backgroundColor: appColor,
      paddingHorizontal: 10,
      paddingTop: 25
   },
   formContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   buttonStyle: {
      width: 300,
      height: 40,
      marginBottom: 5
   }
};

