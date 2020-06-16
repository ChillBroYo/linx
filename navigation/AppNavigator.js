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
    Main: MainTabNavigator,
    // Onboarding,
    ResetPassword,
    SignIn,
    SignUp,
    MessagesScreen,
    IndividualChatScreen,
    // ContactProfileScreen
};

const NavigatorConfig = {
    initialRouteName: 'IndividualChatScreen',
};

export default createAppContainer(createSwitchNavigator(RouteConfig, NavigatorConfig));