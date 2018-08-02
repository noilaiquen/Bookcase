import React, { Component } from 'react';
import {
   Text,
   View,
   ActivityIndicator,
   Image
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-native-elements';
import { appTextColor, appFont } from '../../config/constants';
import { logout } from '../../actions/Auth';

class Profile extends Component {
   render() {
      const { user } = this.props;
      if (user === null) {
         return (
            <View style={styles.loadingContainer}>
               <ActivityIndicator
                  size="small"
                  color={appTextColor}
               />
            </View>
         );
      }
      return (
         <View style={styles.container}>
            <Image 
               style={styles.avatar}
               resizeMode="contain"
               source={{ uri: user.photoURL }} 
            />
            <Text style={styles.name}>{user.displayName}</Text>
            <Text style={styles.email}>{user.email}</Text>

            <View style={styles.buttons}>
               <Button
                  title="Sign out"
                  fontFamily={appFont}
                  buttonStyle={styles.buttonSignOut}
                  backgroundColor={appTextColor}
                  onPress={() => this.props.logout()}
               />
            </View>
         </View>
      );
   }
}

const mapStatetoProps = ({ auth }) => ({
   user: auth.user
});

const mapDispatchToProps = dispatch => (
   bindActionCreators({ logout }, dispatch)
);

export default connect(mapStatetoProps, mapDispatchToProps)(Profile);

const styles = {
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF',
   },
   loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF',
   },
   name: {
      fontSize: 20,
      margin: 10,
      fontFamily: appFont,
      color: appTextColor
   },
   email: {
      fontSize: 18,
      fontFamily: appFont,
   },
   buttons: {
      marginTop: 20
   },
   buttonSignOut: {
      width: 300,
      height: 40
   },
   avatar: {
      width: 100,
      height: 100,
      borderRadius: 50
   }
};

