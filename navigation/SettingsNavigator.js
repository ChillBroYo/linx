import React from 'react';
import { createStackNavigator } from 'react-navigation';
import SettingsHome from '../screens/Settings';
import SettingsBirthday from '../screens/user/Birthday';
import SettingsEmail from '../screen/user/Email';
import SettingsGender from '../screens/user/Gender';
import SettingsInterests from '../screens/user/Interests';
import SettingsLocation from '../screens/user/Location';
import SettingsName from '../screens/user/Name';
import SettingsPassword from '../screen/user/Password';
import SettingsProfile from '../screen/user/Profile';
import TabBarIcon from '../components/TabBarIcon';

const SettingsStack = createStackNavigator(
    {
        SettingsBirthday,
        SettingsEmail,
        SettingsGender,
        SettingsHome,
        SettingsInterests,
        SettingsLocation,
        SettingsName,
        SettingsPassword,
        SettingsProfile,
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
