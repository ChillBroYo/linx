import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import ResetPassword from '../screens/ResetPassword';
import SignIn from '../screens/SignInScreen';
import SignUp from './SignUpNavigator';
import MessagesScreen from "../screens/MessagesScreen";
import IndividualChatScreen from "../screens/IndividualChatScreen";
import ContactProfileScreen from "../screens/ContactProfileScreen";

const RouteConfig = {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    ContactProfileScreen,
    IndividualChatScreen,
    MessagesScreen,
    Main: MainTabNavigator,
    ResetPassword,
    SignIn,
    SignUp,
};

const NavigatorConfig = {
    initialRouteName: 'SignIn',
};

export default createAppContainer(createSwitchNavigator(RouteConfig, NavigatorConfig));
