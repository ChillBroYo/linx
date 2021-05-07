import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import SettingsHome from '../screens/Settings';
import SettingsBirthday from '../screens/user/Birthday';
import SettingsEmail from '../screens/user/Email';
import SettingsGender from '../screens/user/Gender';
import SettingsLocation from '../screens/user/Location';
import SettingsPassword from '../screens/user/Password';
import SettingsProfile from '../screens/user/Profile';
import SettingsProfileImage from '../screens/user/ProfileImage';
import TabBarIcon from '../components/TabBarIcon';

const SettingsStack = createStackNavigator(
    {
        SettingsBirthday,
        SettingsEmail,
        SettingsGender,
        SettingsHome,
        SettingsLocation,
        SettingsPassword,
        SettingsProfile,
        SettingsProfileImage,
    },
    {
        headerMode: 'none',
        initialRouteName: 'SettingsHome',
        navigationOptions: ({ navigation }) => {
            const routes = navigation.state.routes;
            const currentRoute = routes[routes.length - 1];
            return {
                tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name='settings' />,
                tabBarVisible: currentRoute.routeName == 'SettingsHome',
            };
        },
    },
);

export default SettingsStack;
