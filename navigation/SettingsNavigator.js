import React from 'react';
import { createStackNavigator } from 'react-navigation';
import SettingsHome from '../screens/SettingsHome';
import SettingsName from '../screens/user/Name';
import SettingsLocation from '../screens/user/Location';
import SettingsBirthday from '../screens/user/Birthday';
import SettingsGender from '../screens/user/Gender';
import SettingsInterests from '../screens/user/Interests';
import TabBarIcon from '../components/TabBarIcon';

const SettingsStack = createStackNavigator(
    {
        SettingsBirthday,
        SettingsHome,
        SettingsGender,
        SettingsInterests,
        SettingsLocation,
        SettingsName,
    },
    {
        headerMode: 'none',
        initialRouteName: 'SettingsHome',
        navigationOptions: {
            tabBarLabel: 'Settings',
            tabBarIcon: ({ focused }) => (
                <TabBarIcon focused={focused} name='settings' />
            ),
        }
    },
);

export default SettingsStack;
