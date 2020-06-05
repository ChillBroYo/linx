import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import HomeScreen from '../screens/newHomeScreen';
import OnboardWelcomeScreen from '../screens/onboarding/Welcome';
import OnboardProfileScreen from '../screens/onboarding/Profile';
import OnboardTakeProfileScreen from '../screens/onboarding/TakeProfile';
import OnboardDenyProfileScreen from '../screens/onboarding/DenyProfile';
import OnboardConfirmDenialScreen from '../screens/onboarding/ConfirmDenial';
import SettingsScreen from '../screens/SettingsScreen';
import TabBarIcon from '../components/TabBarIcon';

const config = Platform.select({
    web: { headerMode: 'screen' },
    default: { headerMode: 'none' },
});

// CARDS TAB
const CardsStack = createStackNavigator(
    {
        ConfirmDenial: OnboardConfirmDenialScreen,
        DenyProfile: OnboardDenyProfileScreen,
        Profile: OnboardProfileScreen,
        TakeProfile: OnboardTakeProfileScreen,
        Welcome: OnboardWelcomeScreen,
    },
    {
        initialRouteName: 'Welcome',
        ...config,
    },
);

CardsStack.navigationOptions = {
    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name='cards' />
};

CardsStack.path = '';


// FRIENDS TAB
const FriendsStack = createStackNavigator(
    {
        Messages: HomeScreen,
    },
    config,
);

FriendsStack.navigationOptions = {
    tabBarLabel: 'Friends',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name='friends' />
    ),
};

FriendsStack.path = '';


// SETTINGS TAB
const SettingsStack = createStackNavigator(
    {
        Settings: SettingsScreen
    },
    config
);

SettingsStack.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name='settings' />
    ),
};

SettingsStack.path = '';


// BOTTOM TAB
const BottomTabRouteConfig = {
    Friends: FriendsStack,
    Cards: CardsStack,
    Settings: SettingsStack,
};

const BottomTabNavigatorConfig = {
    initialRouteName: 'Cards',
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused }) => {
            // routeName corresponds to keys in BottomTabRouteConfig
            const { routeName } = navigation.state;
            return <TabBarIcon focused={focused} name={routeName} />;
        }
    }),
    tabBarOptions: {
        showLabel: false,
        style: { height: 100 },
    },
};

const tabNavigator = createBottomTabNavigator(BottomTabRouteConfig, BottomTabNavigatorConfig);

tabNavigator.path = '';

export default tabNavigator;
