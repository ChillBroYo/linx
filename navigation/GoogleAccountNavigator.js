import { createStackNavigator } from 'react-navigation';
import GoogleAccountBirthday from '../screens/user/Birthday';
import GoogleAccountGender from '../screens/user/Gender';
import GoogleAccountLocation from '../screens/user/Location';

const GoogleAccountStack = createStackNavigator(
    {
        GoogleAccountBirthday,
        GoogleAccountGender,
        GoogleAccountLocation,
    },
    {
        headerMode: 'none',
        initialRouteName: 'GoogleAccountLocation',
    },
);

export default GoogleAccountStack;
