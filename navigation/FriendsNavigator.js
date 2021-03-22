import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import FriendsHome from '../screens/friends/Friends';
import FriendsMessage from '../screens/friends/Message';
import FriendsProfile from '../screens/friends/Profile';
import TabBarIcon from '../components/TabBarIcon';

const FriendsStack = createStackNavigator(
    {
        FriendsHome,
        FriendsMessage,
        FriendsProfile,
    },
    {
        headerMode: 'none',
        initialRouteName: 'FriendsHome',
        navigationOptions: ({ navigation }) => {
            const routes = navigation.state.routes;
            const currentRoute = routes[routes.length - 1];
            return {
                tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name='friends' />,
                tabBarVisible: currentRoute.routeName == 'FriendsHome',
            };
        },
    }
);

export default FriendsStack;
