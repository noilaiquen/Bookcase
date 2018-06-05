import React, { Component } from 'react';
import {
   View,
   ImageBackground
} from 'react-native';
import { Button } from 'react-native-elements';
import { appColor, appTextColor, appFont } from '../../config/constants'; 
import bg from '../../assets/main.jpg';

class Main extends Component {
   render() {
      return (
         <ImageBackground
            source={bg}   
            style={styles.container}
         >
            <View style={styles.offsetView} />   
            <View style={styles.buttonContainer}>            
               <Button
                  title="Sign in"
                  fontFamily={appFont}
                  backgroundColor={appTextColor} 
                  buttonStyle={styles.buttonStyle}
                  onPress={() => this.props.navigation.navigate('SignIn')}
               />
               <Button
                  title="Create an account"
                  fontFamily={appFont}
                  color={appTextColor}
                  backgroundColor="#FFF" 
                  buttonStyle={styles.buttonStyle}
                  onPress={() => this.props.navigation.navigate('SignUp')}
               />
            </View>   
         </ImageBackground>
      );
   }
}

export default Main;
const styles = {
   container: {
      flex: 1,
      backgroundColor: appColor
   },
   offsetView: {
      flex: 3.5
   },
   buttonContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
   },
   buttonStyle: {
      width: 300,
      height: 40,
      marginBottom: 5
   } 
};

