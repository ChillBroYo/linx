import React from 'react';
import { createStackNavigator } from 'react-navigation';
import MessagesHome from '../screens/MessagesScreen';
import MessagesConversation from '../screens/IndividualChatScreen';
import MessagesProfile from '../screens/ContactProfileScreen.js';
import TabBarIcon from '../components/TabBarIcon';

const MessagesStack = createStackNavigator(
    {
        MessagesConversation,
        MessagesHome,
        MessagesProfile,
    },
    {
        headerMode: 'none',
        initialRouteName: 'MessagesHome',
        navigationOptions: ({ navigation }) => {
            const routes = navigation.state.routes;
            const currentRoute = routes[routes.length - 1];
            return {
                tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name='messages' />,
                tabBarVisible: currentRouteName == 'MessagesHome',
            };
        },
    }
);

export default MessagesStack;
