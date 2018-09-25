import React, { Component } from 'react';
import {
   View,
   StatusBar,
   TextInput,
   Alert,
   Keyboard
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import { firebaseApp } from '../../config/firebaseConfig';
import { HeaderLeft } from '../../components';
import { appColor, appTextColor, appFont } from '../../config/constants';


class SignUp extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loading: false,
         fullname: '',
         email: '',
         password: '',
         rePassword: '',
      };
   }

   setFullname = (fullname) => {
      this.setState({
         fullname
      });
   }

   setEmail = (email) => {
      this.setState({
         email
      });
   }

   setPassword = (password) => {
      this.setState({
         password
      });
   }

   setRePassword = (rePassword) => {
      this.setState({
         rePassword
      });
   }

   signUpEmailPassword = async () => {
      this.setState({ loading: true });
      Keyboard.dismiss();

      const { email, password, rePassword, fullname } = this.state;
      if (email === '' || password === '' || rePassword === '') {
         this.setState({ loading: false });
         Alert.alert('', 'Password or email is empty!');
         return;
      }

      if (rePassword !== password) {
         this.setState({ loading: false });
         Alert.alert('', 'Two passwords not match!');
         return;
      }
      try {
         const user = await firebaseApp.auth().createUserWithEmailAndPassword(email, password);
         if (user) {
            await user.updateProfile({
               displayName: fullname !== '' ? fullname : 'No name',
               photoURL: 'https://firebasestorage.googleapis.com/v0/b/bookcase-d1e17.appspot.com/o/avatars%2Fnoavatar.png?alt=media&token=ac2392e7-7ea1-4617-90f7-88370dd9ceef'
            });
         }
      } catch (err) {
         this.setState({ loading: false });
         Alert.alert('', err.message);
      }
   }

   render() {
      return (
         <View style={styles.container}>
            <StatusBar barStyle="light-content" />   
            <HeaderLeft
               icon="md-close-circle"
               color="#FFF"
               onPress={() => this.props.navigation.goBack()}
            />
            <View style={styles.formContainer}>
               <TextInput
                  placeholder="Fullname"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  returnKeyType="next"
                  autoCapitalize="none"
                  underlineColorAndroid="rgba(0,0,0,0)"
                  onChangeText={text => this.setFullname(text)}
                  onSubmitEditing={() => this.emailInput.focus()}
                  style={styles.textInput}
               />   
               <TextInput
                  ref={(input) => this.emailInput = input}  //eslint-disable-line   
                  placeholder="Email"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  returnKeyType="next"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  underlineColorAndroid="rgba(0,0,0,0)"
                  onChangeText={text => this.setEmail(text)}
                  onSubmitEditing={() => this.passwordInput.focus()}
                  style={styles.textInput}
               />

               <TextInput
                  ref={(input) => this.passwordInput = input}  //eslint-disable-line
                  placeholder="Password"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  returnKeyType="next"
                  secureTextEntry
                  underlineColorAndroid="rgba(0,0,0,0)"
                  onChangeText={text => this.setRePassword(text)}
                  onSubmitEditing={() => this.rePasswordInput.focus()}
                  style={styles.textInput}
               />

               <TextInput
                  ref={(input) => this.rePasswordInput = input}  //eslint-disable-line
                  placeholder="Re password"
                  placeholderTextColor="rgba(255,255,255,0.7)"
                  returnKeyType="go"
                  secureTextEntry
                  underlineColorAndroid="rgba(0,0,0,0)"
                  onChangeText={text => this.setPassword(text)}
                  onSubmitEditing={() => this.signUpEmailPassword()}
                  style={styles.textInput}
               />

               <Button 
                  title="Register"
                  loading={this.state.loading}
                  fontFamily={appFont}
                  buttonStyle={styles.buttonStyle}
                  backgroundColor={appTextColor}
                  onPress={() => this.signUpEmailPassword()}
               />
            </View>
         </View>
      );
   }
}

SignUp.propTypes = {
   navigation: PropTypes.object.isRequired
};

export default SignUp;

const styles = {
   container: {
      flex: 1,
      paddingHorizontal: 10,
      paddingTop: 25,
      backgroundColor: appColor
   },
   formContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
   },
   textInput: {
      height: 40,
      backgroundColor: 'rgba(255,255,255,0.2)',
      marginBottom: 15,
      width: 300,
      color: 'rgba(255,255,255,0.9)',
      paddingHorizontal: 10,
      fontFamily: appFont
   },
   buttonStyle: {
      width: 300,
      height: 40
   },
};
