import { Animated } from 'react-native';

export const scaling = {
    scalingStyle(animated: Animated.Value, startSize: number = 1, endSize: number = 0.75) {
        const interpolation = animated.interpolate({
            inputRange: [0, 1],
            outputRange: [startSize, endSize],
        });
        return {
          transform: [
            { scale: interpolation },
          ],
        };
    },

    pressInAnim(animated: Animated.Value, duration: number = 150) {
        animated.setValue(0);
        Animated.timing(animated, {
            toValue: 1,
            duration,
            useNativeDriver: true,
        }).start();
    },

    pressOutAnim(animated: Animated.Value, duration: number = 150) {
        animated.setValue(1);
        Animated.timing(animated, {
            toValue: 0,
            duration,
            useNativeDriver: true,
        }).start();
    },
};

export const popup = {
    title: 'Permission Denied',
    message: 'Linx currently does not have permission to access Camera. Please go into Settings to grant Linx access.',
    btn1Text: 'OK',
    btn2Text: 'Settings'
};

export const popup2 = {
    title: 'Permission Denied',
    message: 'Linx currently does not have permission to access Camera Roll. Please go into Settings to grant Linx access.',
    btn1Text: 'OK',
    btn2Text: 'Settings'
}
