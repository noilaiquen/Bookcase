import React from 'react';
import {
   View,
   TextInput
} from 'react-native';
import { Button } from 'react-native-elements';
import { appTextColor, appFont } from '../config/constants';

const FormSignIn = ({ loading, onSignIn, setEmail, setPassword }) => (
   <View style={styles.container}>
      <View>
         <TextInput
            placeholder="Email"
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="next"
            keyboardType="email-address"
            autoCapitalize="none"
            underlineColorAndroid="rgba(0,0,0,0)"
            onChangeText={text => setEmail(text)}
            onSubmitEditing={() => this.passwordInput.focus()}
            style={styles.textInput}
         />
      </View>
      <View>
         <TextInput
            ref={(input) => this.passwordInput = input}  //eslint-disable-line
            placeholder="Password"
            placeholderTextColor="rgba(255,255,255,0.7)"
            returnKeyType="go"
            secureTextEntry
            underlineColorAndroid="rgba(0,0,0,0)"
            onChangeText={text => setPassword(text)}
            onSubmitEditing={() => onSignIn()}
            style={styles.textInput}
         />
      </View>
      <View>
         <Button
            loading={loading}
            title="Sign in"
            buttonStyle={styles.buttonStyle}
            fontFamily={appFont}
            backgroundColor={appTextColor}
            onPress={() => onSignIn()}
         />
      </View>
   </View>
);
export default FormSignIn;

const styles = {
   container: {
      alignItems: 'center',
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
      height: 40,
      width: 300,
      marginBottom: 5,
   }
};

