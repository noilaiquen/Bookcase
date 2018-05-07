import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { appFont } from '../config/constants';

const HeaderLeft = ({ icon, text, onPress }) => (
   <TouchableOpacity
      onPress={() => onPress()}
      style={{ flexDirection: 'row', alignItems: 'center' }}
   >
      <Icon
         name={icon}
         type="ionicon"
         size={25}
         color="#FFF"
      />
      <Text style={{ fontFamily: appFont, fontSize: 16, color: '#FFF' }}> {text}</Text>
   </TouchableOpacity>
);

export default HeaderLeft;
