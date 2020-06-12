import { createStackNavigator } from 'react-navigation';
import UserCredentials from '../screens/user/Credentials';
import UserName from '../screens/user/Name';
import UserLocation from '../screens/user/Location';
import UserBirthday from '../screens/user/Birthday';
import UserGender from '../screens/user/Gender';
import UserInterests from '../screens/user/Interests';

const SignUpStack = createStackNavigator(
    {
        UserBirthday,
        UserCredentials,
        UserGender,
        UserInterests,
        UserLocation,
        UserName,
    },
    {
        headerMode: 'none',
        initialRouteName: 'UserCredentials',
    },
);

export default SignUpStack;
