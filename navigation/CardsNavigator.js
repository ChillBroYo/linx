import React from 'react';
import { createStackNavigator } from 'react-navigation';
import WelcomeScreen from '../screens/onboarding/Welcome';
import ProfileScreen from '../screens/onboarding/Profile';
import TakeProfileScreen from '../screens/onboarding/TakeProfile';
import ReviewProfileScreen from '../screens/onboarding/ReviewProfile';
import ConfirmProfileScreen from '../screens/onboarding/ConfirmProfile';
import DenyProfileScreen from '../screens/onboarding/DenyProfile';
import ConfirmDenialScreen from '../screens/onboarding/ConfirmDenial';
import TabBarIcon from '../components/TabBarIcon';

const CardsStack = createStackNavigator(
    {
        ConfirmDenial: ConfirmDenialScreen,
        ConfirmProfile: ConfirmProfileScreen,
        DenyProfile: DenyProfileScreen,
        Profile: ProfileScreen,
        ReviewProfile: ReviewProfileScreen,
        TakeProfile: TakeProfileScreen,
        Welcome: WelcomeScreen,
    },
    {
        headerMode: 'none',
        initialRouteName: 'Welcome',
        navigationOptions: ({ navigation }) => {
            const routes = navigation.state.routes;
            const currentRoute = routes[routes.length - 1];
            return {
                tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name='cards' />,
                tabBarVisible: currentRoute.routeName != 'TakeProfile',
            };
        },
    },
);

export default CardsStack;
