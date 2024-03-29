import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import ResetPassword from '../screens/ResetPassword';
import SignIn from '../screens/SignInScreen';
import SignUp from './SignUpNavigator';
import AlternateAccount from './AlternateAccountNavigator';

const RouteConfig = {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: { screen: MainTabNavigator, path: 'main' },
    ResetPassword,
    SignIn,
    SignUp,
    AlternateAccount
};

const NavigatorConfig = {
    initialRouteName: 'SignIn',
};

export default createAppContainer(createSwitchNavigator(RouteConfig, NavigatorConfig));
