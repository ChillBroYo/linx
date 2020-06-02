import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import ResetPassword from '../screens/ResetPassword';
import Settings from '../screens/SettingsScreen';
import SignIn from '../screens/SignInScreen';
import SignUp from '../screens/SignUpScreen';

export default createAppContainer(
    createSwitchNavigator({
        // You could add another route here for authentication.
        // Read more at https://reactnavigation.org/docs/en/auth-flow.html
        Settings,
        SignIn,
        SignUp,
        ResetPassword,
        Main: MainTabNavigator,
    })
);
