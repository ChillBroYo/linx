import { createStackNavigator } from 'react-navigation';
import SignUpCredentials from '../screens/user/Credentials';
import SignUpName from '../screens/user/Name';
import SignUpLocation from '../screens/user/Location';
import SignUpBirthday from '../screens/user/Birthday';
import SignUpGender from '../screens/user/Gender';
import SignUpInterests from '../screens/user/Interests';

const SignUpStack = createStackNavigator(
    {
        SignUpBirthday,
        SignUpCredentials,
        SignUpGender,
        SignUpInterests,
        SignUpLocation,
        SignUpName,
    },
    {
        headerMode: 'none',
        initialRouteName: 'SignUpCredentials',
    },
);

export default SignUpStack;
