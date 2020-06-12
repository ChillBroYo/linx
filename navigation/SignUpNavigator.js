import { createStackNavigator } from 'react-navigation';
import LoginCredentials from '../screens/signup/LoginCredentials';
import UserName from '../screens/signup/UserName';
import UserLocation from '../screens/signup/UserLocation';
import UserBirthday from '../screens/signup/UserBirthday';
import UserGender from '../screens/signup/UserGender';
import UserInterests from '../screens/signup/UserInterests';

const SignUpStack = createStackNavigator(
    {
        LoginCredentials,
        UserBirthday,
        UserGender,
        UserInterests,
        UserLocation,
        UserName,
    },
    {
        headerMode: 'none',
        initialRouteName: 'LoginCredentials',
    },
);

export default SignUpStack;
