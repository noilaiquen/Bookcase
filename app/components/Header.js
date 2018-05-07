import React from 'react';
import {
   Text,
   TouchableOpacity
} from 'react-native';
import { Icon, Header as HeaderRNE } from 'react-native-elements';
import { appFont, appFontBold, appColor } from '../config/constants';

const HeaderLeft = ({ icon, text, onPress }) => (
   <TouchableOpacity
      onPress={() => onPress()}
      style={styles.headerLeftContainer}
   >
      <Icon
         name={icon}
         type="ionicon"
         size={25}
         color="#FFF"
      />
      <Text style={styles.textLeft}> 
         {` ${text}` || null }
      </Text>
   </TouchableOpacity>
);

const HeaderRight = ({ icon, onPress }) => (
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

const HeaderCenter = ({ text, style }) => (
   <Text style={style || styles.headerCenter}>{ text || 'Bookcase' }</Text>
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
               <HeaderCenter 
                  text={centerComponent.text}
                  style={centerComponent.style}
               /> : null
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
      fontFamily: appFontBold
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
