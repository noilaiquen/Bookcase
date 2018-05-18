import React, { Component } from 'react';
import {
   View,
   Text,
   Image
} from 'react-native';
import { Button } from 'react-native-elements';
import { appColor, appTextColor, appFont } from '../../config/constants'; 
import logo from '../../assets/logo.png';

class Main extends Component {
   render() {
      return (
         <View style={styles.container}>
            <View style={styles.logoContainer}>
               <Text style={styles.logoText}>BOOCASE</Text>   
               <Image
                  source={logo}
                  style={styles.logoImage}
                  resizeMode="contain"
               /> 
            </View>

            <View style={styles.buttonContainer}>            
               <Button
                  title="SIGN IN"
                  backgroundColor={appTextColor} 
                  buttonStyle={styles.buttonStyle}
                  onPress={() => this.props.navigation.navigate('SignIn')}
               />
            </View>   
         </View>
      );
   }
}

export default Main;
const styles = {
   container: {
       flex: 1,
       backgroundColor: appColor
    },
    logoContainer: {
       flex: 3,
       alignItems: 'center',
       justifyContent: 'center'
    },
    logoText: {
       fontFamily: appFont,
       color: '#FFF',
       fontSize: 20
    },
    logoImage: {
       width: 300,
       height: 300
    },
    buttonContainer: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
    },
    buttonStyle: {
       width: 300,
       height: 50
    } 
 };

