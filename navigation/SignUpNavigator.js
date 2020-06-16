import { createStackNavigator } from 'react-navigation';
import SignUpBirthday from '../screens/user/Birthday';
import SignUpCredentials from '../screens/user/Credentials';
import SignUpGender from '../screens/user/Gender';
import SignUpInterests from '../screens/user/Interests';
import SignUpLocation from '../screens/user/Location';
import SignUpProfile from '../screens/user/Profile';

const SignUpStack = createStackNavigator(
    {
        SignUpBirthday,
        SignUpCredentials,
        SignUpGender,
        SignUpInterests,
        SignUpLocation,
        SignUpProfile,
    },
    {
        headerMode: 'none',
        initialRouteName: 'SignUpCredentials',
    },
);

export default SignUpStack;
