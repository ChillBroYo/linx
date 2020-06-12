import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import HomeScreen from '../screens/newHomeScreen';
import CardsStack from './CardsNavigator';
import SettingsStack from './SettingsNavigator';
import TabBarIcon from '../components/TabBarIcon';


// FRIENDS TAB
const FriendsStack = createStackNavigator(
    {
        Messages: HomeScreen,
    },
    {
        headerMode: 'none',
    },
);

FriendsStack.navigationOptions = {
    tabBarLabel: 'Friends',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name='friends' />
    ),
};


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

export default tabNavigator;
