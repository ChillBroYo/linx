import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import ResetPassword from '../screens/ResetPassword';
import SignIn from '../screens/SignInScreen';
import SignUp from './SignUpNavigator';

const RouteConfig = {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    // Onboarding,
    ResetPassword,
    SignIn,
    SignUp,
};

const NavigatorConfig = {
	//Switch back to 'SignIn' after testing
    initialRouteName: 'Main',
};

export default createAppContainer(createSwitchNavigator(RouteConfig, NavigatorConfig));
