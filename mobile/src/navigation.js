import React from 'react';
import { addNavigationHelpers, StackNavigator, TabNavigator } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import ExploreScreen from './screens/ExploreScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProfileScreen from './screens/ProfileScreen';
import { colors } from './utils/constants';

const Tabs = TabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) =>
        <FontAwesome
          size={25}
          color={tintColor}
          name="home"
        />,
    }),
  },
  Explore: {
    screen: ExploreScreen,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) =>
        <FontAwesome
          size={25}
          color={tintColor}
          name="search"
        />,
    }),
  },
  Notifications: {
    screen: NotificationsScreen,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) =>
        <FontAwesome
          size={25}
          color={tintColor}
          name="bell"
        />,
    }),
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) =>
        <FontAwesome
          size={25}
          color={tintColor}
          name="user"
        />,
    }),
  },
}, {
  swipeEnabled: false,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showIcon: true,
    showLabel: true,
    activeTintColor: colors.PRIMARY,
    inactiveTintColor: colors.LIGHT_GRAY,
    style: {
      height: 50,
      backgroundColor: colors.WHITE,
      shadowColor: colors.SECONDARY,
      shadowOpacity: 0.1,
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowRadius: 4
    },
  },
})

export default StackNavigator({
  Home: {
    screen: Tabs,
  },
}, {
  cardStyle: {
    backgroundColor: '#F1F6FA'
  },
  navigationOptions: {
    headerStyle: {
      backgroundColor: colors.WHITE,
      shadowColor: colors.SECONDARY,
      shadowOpacity: 0.1,
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowRadius: 4
    }
  }
})