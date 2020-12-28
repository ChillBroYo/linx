import { createStackNavigator } from 'react-navigation';
import SignUpBirthday from '../screens/user/Birthday';
import SignUpGender from '../screens/user/Gender';
import SignUpLocation from '../screens/user/Location';

const GoogleSignUpStack = createStackNavigator(
    {
        SignUpBirthday,
        SignUpGender,
        SignUpLocation,
    },
    {
        headerMode: 'none',
        initialRouteName: 'SignUpLocation',
    },
);

export default GoogleSignUpStack;
