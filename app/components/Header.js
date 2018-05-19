import React from 'react';
import {
   Text,
   TouchableOpacity,
   Image,
   View
} from 'react-native';
import { Icon, Header as HeaderRNE } from 'react-native-elements';
import { appFont, appColor } from '../config/constants';
import logo from '../assets/logo_header.png';

export const HeaderLeft = ({ icon, text, onPress, color }) => (
   <TouchableOpacity
      onPress={() => onPress()}
      style={styles.headerLeftContainer}
   >
      <Icon
         name={icon}
         type="ionicon"
         size={25}
         color={color || '#FFF'}
      />
      <Text style={[styles.textLeft, { color: color || '#FFF' }]}> 
         {` ${text}` || null }
      </Text>
   </TouchableOpacity>
);

export const HeaderRight = ({ icon, onPress }) => (
   <TouchableOpacity
      onPress={() => onPress()}
      style={styles.headerRightContainer}
   >
      <Icon
         name={icon}
         type="ionicon"
         size={25}
         color="#FFF"
      />
   </TouchableOpacity>
);

export const HeaderCenter = () => (
   <Image
      style={{ width: 150 }}
      resizeMode="contain"   
      source={logo}
   />
);

const Header = props => {
   const { leftComponent, rightComponent, centerComponent } = props;

   return (
      <HeaderRNE
         backgroundColor={appColor}
         leftComponent={
            leftComponent !== undefined ? 
               <HeaderLeft 
                  icon={leftComponent.icon}
                  text={leftComponent.text}
                  onPress={leftComponent.onPress}
               /> : null
            }

         centerComponent={
            centerComponent !== undefined ? 
               <HeaderCenter /> : null
            }

         rightComponent={
            rightComponent !== undefined ? 
               <HeaderRight
                  icon={rightComponent.icon}
                  onPress={rightComponent.onPress}
               /> : null
            }
      />
   );
};


export default Header;

const styles = {
   headerCenter: {
      color: '#fff',
      fontSize: 20,
      fontFamily: appFont,
      // fontWeight: '600',
   },
   headerLeftContainer: {
      flexDirection: 'row', 
      alignItems: 'center'
   },
   textLeft: {
      fontFamily: appFont, 
      fontSize: 16, 
      color: '#FFF' 
   },
   headerRightContainer: {
      flexDirection: 'row', 
      alignItems: 'center'
   }
};
