import { createStackNavigator } from 'react-navigation-stack';
import AlternateAccountBirthday from '../screens/user/Birthday';
import AlternateAccountGender from '../screens/user/Gender';
import AlternateAccountLocation from '../screens/user/Location';

const AlternateAccountStack = createStackNavigator(
    {
        AlternateAccountBirthday,
        AlternateAccountGender,
        AlternateAccountLocation,
    },
    {
        headerMode: 'none',
        initialRouteName: 'AlternateAccountLocation',
    },
);

export default AlternateAccountStack;
