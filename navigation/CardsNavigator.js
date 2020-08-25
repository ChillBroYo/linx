import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ProfileScreen from '../screens/onboarding/Profile';
import TakeProfileScreen from '../screens/onboarding/TakeProfile';
import ReviewProfileScreen from '../screens/onboarding/ReviewProfile';
import DenyProfileScreen from '../screens/onboarding/DenyProfile';
import WelcomeScreen1 from '../screens/onboarding/Welcome1';
import WelcomeScreen2 from '../screens/onboarding/Welcome2';
import WelcomeScreen3 from '../screens/onboarding/Welcome3';
import MainCardsScreen from '../screens/cards/MainCards';
import UserStatusScreen from '../screens/cards/UserStatus';
import TabBarIcon from '../components/TabBarIcon';

const CardsStack = createStackNavigator(
    {
        UserStatus: UserStatusScreen,
        Profile: ProfileScreen,
        TakeProfile: TakeProfileScreen,
        ReviewProfile: ReviewProfileScreen,
        DenyProfile: DenyProfileScreen,
        Welcome1: WelcomeScreen1,
        Welcome2: WelcomeScreen2,
        Welcome3: WelcomeScreen3,
        MainCards: MainCardsScreen,
    },
    {
        headerMode: 'none',
        initialRouteName: 'UserStatus',
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