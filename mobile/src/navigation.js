import React, { PureComponent } from 'react';
import { addNavigationHelpers, StackNavigator, TabNavigator } from 'react-navigation';
import { FontAwesome, SimpleLineIcons, EvilIcons } from '@expo/vector-icons';
import { Keyboard, ActivityIndicator } from 'react-native';
import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { connectActionSheet } from '@expo/react-native-action-sheet';

import styled from 'styled-components/native';
import Touchable from '@appandflow/touchable';

import HomeScreen from './screens/HomeScreen';
import ExploreScreen from './screens/ExploreScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import NewTweetScreen from './screens/NewTweetScreen';
import { colors } from './utils/constants';
import ME_QUERY from './graphql/queries/me';
import { getUserInfo, logout } from './actions/user';

const TAB_ICON_SIZE = 20;

const Avatar = styled.Image`
  height: 30;
  width: 30;
  borderRadius: 15;
`;

class AvatarCp extends React.Component {
  _onOpenActionSheet = () => {
    const options = ['Logout', 'Cancel'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;
    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          this.props.client.resetStore();
          return this.props.logout();
        }
      }
    );
  };
  render() {
    if (!this.props.info) {
      return (
        <ButtonLeft disabled>
          <ActivityIndicator color={colors.PRIMARY} />
        </ButtonLeft>
      );
    }
    return (
      <ButtonLeft onPress={this._onOpenActionSheet}>
        <Avatar source={{ uri: this.props.info.avatar }} />
      </ButtonLeft>
    );
  }
}

const AvatarState = withApollo(connect(state => state.user, { logout })(connectActionSheet(AvatarCp)));

const ButtonRight = styled(Touchable).attrs({
  feedback: 'opacity',
  hitSlop: { top: 20, bottom: 20, right: 20, left: 20 },
}) `
  marginRight: 15;
  justifyContent: center;
  alignItems: center;
`;

const ButtonLeft = styled(Touchable).attrs({
  feedback: 'opacity',
  hitSlop: { top: 20, bottom: 20, right: 20, left: 20 },
}) `
  marginLeft: 15;
  justifyContent: center;
  alignItems: center;
`;

const Tabs = TabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      headerTitle: 'Home',
      tabBarIcon: ({ tintColor }) =>
        (<FontAwesome
          size={TAB_ICON_SIZE}
          color={tintColor}
          name="home"
        />),
    }),
  },
  Explore: {
    screen: ExploreScreen,
    navigationOptions: () => ({
      headerTitle: 'Explore',
      tabBarIcon: ({ tintColor }) =>
        (<FontAwesome
          size={TAB_ICON_SIZE}
          color={tintColor}
          name="search"
        />),
    }),
  },
  Notifications: {
    screen: NotificationsScreen,
    navigationOptions: () => ({
      headerTitle: 'Notifications',
      tabBarIcon: ({ tintColor }) =>
        (<FontAwesome
          size={TAB_ICON_SIZE}
          color={tintColor}
          name="bell"
        />),
    }),
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      headerTitle: 'My Profile',
      header: null,
      tabBarIcon: ({ tintColor }) =>
        (<FontAwesome
          size={TAB_ICON_SIZE}
          color={tintColor}
          name="user"
        />),
    }),
  },
}, {
  swipeEnabled: false,
  tabBarPosition: 'bottom',
  lazy: true,
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeTintColor: colors.PRIMARY,
    inactiveTintColor: colors.LIGHT_GRAY,
    style: {
      height: 50,
      backgroundColor: colors.WHITE,
      paddingVertical: 5,
    },
  },
});

const NewTweetModal = StackNavigator({
  NewTweet: {
    screen: NewTweetScreen,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <ButtonLeft>
          <Avatar />
        </ButtonLeft>
      ),
      headerStyle: {},
      headerRight: (
        <ButtonRight onPress={() => {
          // Close the keyboard before the modal
          Keyboard.dismiss();
          navigation.goBack(null);
        }}
        >
          <EvilIcons size={25} color={colors.PRIMARY} name="close" />
        </ButtonRight>
      ),
    }),
  },
}, {
  headerMode: 'none',
});

const AppMainNav = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: ({ navigation }) => ({
      headerRight: (
        <ButtonRight onPress={() => navigation.navigate('NewTweet')}>
          <SimpleLineIcons color={colors.PRIMARY} size={20} name="pencil" />
        </ButtonRight>
      ),
      headerLeft: <AvatarState />,
    }),
  },
  NewTweet: {
    screen: NewTweetModal,
  },
}, {
  cardStyle: {
    backgroundColor: '#F1F6FA',
  },
  mode: 'modal',
  navigationOptions: () => ({
    headerStyle: {
      backgroundColor: colors.WHITE,
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: colors.SECONDARY,
    },
  }),
});

class AppNavigator extends PureComponent { // eslint-disable-line
  componentWillMount() {
    if (this.props.isAuthenticated) {
      this._getUserInfo();
    }
  }

  _getUserInfo = async () => {
    const { data } = await this.props.client.query({ query: ME_QUERY });
    return this.props.dispatch(getUserInfo(data.me));
  }

  render() {
    if (!this.props.isAuthenticated) {
      return <LoginScreen />;
    }
    const nav = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav,
    });
    return <AppMainNav navigation={nav} />;
  }
}

export default withApollo(connect(state => ({
  nav: state.nav,
  isAuthenticated: state.user.isAuthenticated,
}))(AppNavigator));

export const router = AppMainNav.router;
