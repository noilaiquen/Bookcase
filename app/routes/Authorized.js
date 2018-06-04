import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Bookcase from '../screens/authorized/Bookcase';
import Explore from '../screens/authorized/Explore';
import Profile from '../screens/authorized/Profile';
// import Lists from '../screens/authorized/Lists';
import ViewBook from '../screens/authorized/ViewBook';
import ListNote from '../screens/authorized/ListNote';
import Add from '../screens/authorized/Add';
import TabBarComponent from '../components/TabBarComponent';
import { appTextColor, appFont } from '../config/constants';

export const Tabs = TabNavigator({
   Bookcase: {
      screen: Bookcase,
      navigationOptions: {
         tabBarLabel: 'My bookcase',
         tabBarIcon: ({ tintColor }) =>
            <Icon
               name="open-book"
               type="entypo"
               size={28}
               color={tintColor}
            />
      }
   },
   Explore: {
      screen: Explore,
      navigationOptions: {
         tabBarLabel: 'Explore',
         tabBarIcon: ({ tintColor }) =>
            <Icon
               name="ios-map-outline"
               type="ionicon"
               size={28}
               color={tintColor}
            />
      },
   },
   Add: {
      screen: Add,
      navigationOptions: {
         tabBarLabel: 'Add',
         tabBarIcon: ({ tintColor }) =>
            <Icon
               name="ios-add-circle-outline"
               type="ionicon"
               size={28}
               color={tintColor}
            />
      },
   },
   /* Lists: {
      screen: Lists,
      navigationOptions: {
         tabBarLabel: 'Lists',
         tabBarIcon: ({ tintColor }) =>
            <Icon
               name="list"
               type="entypo"
               size={28}
               color={tintColor}
            />
      },
   }, */
   Profile: {
      screen: Profile,
      navigationOptions: {
         tabBarLabel: 'Profile',
         tabBarIcon: ({ tintColor }) =>
            <Icon
               name="ios-person-outline"
               type="ionicon"
               size={28}
               color={tintColor}
            />
      },
   }
}, {
   // initialRouteName: 'Bookcase',
   initialRouteName: 'Add',
   tabBarPosition: 'bottom',
   tabBarComponent: TabBarComponent,
   swipeEnabled: false,
   animationEnabled: false,
   tabBarOptions: {
      showLabel: true,
      showIcon: true,
      upperCaseLabel: false,
      activeTintColor: appTextColor,
      inactiveTintColor: '#9E9E9E',
      labelStyle: {
         fontSize: 8,
         fontFamily: appFont,
         marginTop: 0,
         marginBottom: 0
      },
      iconStyle: {
         width: 31,
         height: 31
      },
      style: {
         backgroundColor: '#FFF',
      },
   }
});

const Authorized = StackNavigator({
   Tabs: {
      screen: Tabs,
      navigationOptions: {
         gesturesEnabled: false
      }
   }, 
   ViewBook: {
      screen: ViewBook,
      navigationOptions: {
         header: null,
         gesturesEnabled: false
      }
   },
   notes: {
      screen: ListNote,
      navigationOptions: {
         header: null,
         gesturesEnabled: false
      }
   }
}, {
   initialRouteName: 'Tabs',
   headerMode: 'screen'
});

export default Authorized;

