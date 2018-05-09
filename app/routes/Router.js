import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Bookcase from '../screens/Bookcase';
import Explore from '../screens/Explore';
// import Lists from '../screens/Lists';
import Profile from '../screens/Profile';
import ViewBook from '../screens/ViewBook';
import ListReview from '../screens/ListReview';
import Add from '../screens/Add';
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
   initialRouteName: 'Bookcase',
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

export const RootNavigator = () => (
   StackNavigator({
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
      Reviews: {
         screen: ListReview,
         navigationOptions: {
            header: null,
            gesturesEnabled: false
         }
      }
   }, {
         initialRouteName: 'Tabs',
         // initialRouteName: 'ViewBook',
         headerMode: 'screen'
   })
);

