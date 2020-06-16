import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabBarIcon({ focused, name }) {
    switch (name) {
        case 'cards':
            return (
                <Image
                    source={( focused
                        ? require('../assets/icons/icon_selected_cards.png')
                        : require('../assets/icons/icon_gray_cards.png')
                    )}
                    style={styles.icon}
                />
            );
        case 'messages':
            return (
                <Image
                    source={( focused
                        ? require('../assets/icons/icon_selected_friends.png')
                        : require('../assets/icons/icon_gray_friends.png')
                    )}
                    style={styles.icon}
                />
            );
        case 'settings':
            return (
                <Image
                    source={( focused
                        ? require('../assets/icons/icon_selected_settings.png')
                        : require('../assets/icons/icon_gray_settings.png')
                    )}
                    style={styles.icon}
                />
            );
        default:
            return null;
    }

}

const styles = StyleSheet.create({
    icon: {
        height: 45,
        resizeMode: 'contain',
    },
});
