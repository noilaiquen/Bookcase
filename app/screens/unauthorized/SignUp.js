import React, { Component } from 'react';
import {
   View,
   StatusBar,
   TextInput,
   Alert,
   Keyboard
} from 'react-native';
import { Button } from 'react-native-elements';
import { firebaseApp } from '../../config/firebaseConfig';
import { HeaderLeft } from '../../components';
import { appColor, appTextColor, appFont } from '../../config/constants';


class SignUp extends Component {
   constructor(props) {
      super(props);
      this.state = {
         loading: false,
         email: '',
         password: '',
         rePassword: '',
      };
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

      const { email, password, rePassword } = this.state;
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
         await firebaseApp.auth().createUserWithEmailAndPassword(email, password);
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
                  title="Sign up now"
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
