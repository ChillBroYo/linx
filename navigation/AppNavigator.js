import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import SignIn from '../screens/LoginScreen';
import SignUp from '../screens/SignUpScreen';
import MessagesScreen from "../screens/MessagesScreen";
import IndividualChatScreen from "../screens/IndividualChatScreen";

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    MessagesScreen: MessagesScreen,
    IndividualChatScreen: IndividualChatScreen,
    SignIn: SignIn,
    SignUp: SignUp,
    Main: MainTabNavigator,
    // MessagesScreen: MessagesScreen, // put here to make bottom nav show
  })
);
