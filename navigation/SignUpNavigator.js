import { createStackNavigator } from 'react-navigation-stack';
import SignUpBirthday from '../screens/user/Birthday';
import SignUpCredentials from '../screens/user/Credentials';
import SignUpGender from '../screens/user/Gender';
import SignUpLocation from '../screens/user/Location';
import SignUpProfile from '../screens/user/Profile';

const SignUpStack = createStackNavigator(
    {
        SignUpBirthday,
        SignUpCredentials,
        SignUpGender,
        SignUpLocation,
        SignUpProfile,
    },
    {
        headerMode: 'none',
        initialRouteName: 'SignUpCredentials',
    },
);

export default SignUpStack;
