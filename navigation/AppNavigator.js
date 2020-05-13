import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import SignIn from '../screens/LoginScreen';
import SignUp from '../screens/SignUpScreen';
import NewSignUp from '../screens/newSignUpScreen';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    SignIn: SignIn,
    //SignUp: SignUp,
    SignUp: NewSignUp,
    Main: MainTabNavigator,
  })
);
