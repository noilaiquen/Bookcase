import React from 'react';
import {
   Text,
   View,
   ImageBackground,
   TouchableWithoutFeedback
} from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';
import { appFontBold, appFont } from '../config/constants';

const LeftComponent = ({ leftButton }) => (
   <TouchableWithoutFeedback onPress={() => leftButton.onPress()}>
      <View style={styles.leftButton}>
         <Icon
            name={leftButton.icon !== undefined ? leftButton.icon : null}
            type="ionicon"
            size={20}
            color="#FFF"
         />
         <Text style={{ color: '#FFF' }}>
            {leftButton.title !== undefined ? leftButton.title : null}
         </Text>
      </View>
   </TouchableWithoutFeedback>
);

const RightComponent = ({ rightButton }) => (
   <TouchableWithoutFeedback onPress={rightButton.onPress()}>
      <View style={styles.leftButton}>
         <Icon
            name={rightButton.icon !== undefined ? rightButton.icon : null}
            type="ionicon"
            size={20}
            color="#FFF"
         />
         <Text style={{ color: '#FFF' }}>
            {rightButton.title !== undefined ? rightButton.title : null}
         </Text>
      </View>
   </TouchableWithoutFeedback>
);

const HeaderBookcase = props => (
   <ImageBackground
      source={props.imageBackground}
      style={[styles.constainer, { height: props.height !== undefined ? props.height : 120 }]}
   >
      <View style={styles.innerContainerStyles}>
         {props.leftButton !== undefined ? (
            <LeftComponent {...props} />
         ) : <View style={styles.offset} />}
         <Text style={styles.textTitle}>{props.title ? props.title : null}</Text>
         {props.rightButton !== undefined ? (
            <RightComponent {...props} />
         ) : <View style={styles.offset} />}
      </View>

      {props.search ? (
         <SearchBar
            onChangeText={text => props.navigation.state.params.onSearch(text)}
            placeholder='Type Here...'
            onClear={() => props.navigation.state.params.onClearSearch()}
            clearIcon={{ type: 'font-awesome', name: 'cancel' }}
            containerStyle={styles.inputSearchContainer}
            inputStyle={styles.inputSearch}
         />
      ) : null}
   </ImageBackground>
);

export default HeaderBookcase;

const styles = {
   constainer: {
      width: null,
      justifyContent: 'center',
      alignItems: 'center'
   },
   innerContainerStyles: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15
   },
   leftButton: {
      flexDirection: 'row',
      alignItems: 'center'
   },
   textTitle: {
      color: '#FFF',
      fontFamily: appFontBold,
      fontSize: 20,
   },
   inputSearchContainer: {
      backgroundColor: 'rgba(0,0,0,0)',
      width: 320,
      borderTopWidth: 0,
      borderBottomWidth: 0
   },
   inputSearch: {
      backgroundColor: '#FFF',
      borderRadius: 5,
      color: '#273c75',
      fontFamily: appFont
   },
   offset: {
      width: 40
   }
};
