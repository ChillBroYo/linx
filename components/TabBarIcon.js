import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { hp, stdHeight } from '../styles/helpers';
import { RFValue } from 'react-native-responsive-fontsize';

export default function TabBarIcon({ focused, name }) {
    switch (name) {
        case 'cards':
            return (
                /*{<Image
                    source={( focused
                        ? require('../assets/icons/icon_selected_cards.png')
                        : require('../assets/icons/icon_gray_cards.png')
                    )}
                    style={styles.icon}
                />}*/
                <MaterialCommunityIcons name='cards-outline' size={RFValue(40, stdHeight)} color={focused ? '#439E73' : '#8D99AE'} />
            );
        case 'friends':
            return (
                /*{<Image
                    source={( focused
                        ? require('../assets/icons/icon_selected_friends.png')
                        : require('../assets/icons/icon_gray_friends.png')
                    )}
                    style={styles.icon}
                />}*/
                <MaterialCommunityIcons name='message-text-outline' size={RFValue(40, stdHeight)} color={focused ? '#439E73' : '#8D99AE'} />
            );
        case 'settings':
            return (
                /*{<Image
                    source={( focused
                        ? require('../assets/icons/icon_selected_settings.png')
                        : require('../assets/icons/icon_gray_settings.png')
                    )}
                    style={styles.icon}
                />}*/
                <MaterialCommunityIcons name='cog-outline' size={RFValue(40, stdHeight)} color={focused ? '#439E73' : '#8D99AE'} />
            );
        default:
            return null;
    }

}

const styles = StyleSheet.create({
    icon: {
        height: hp(45),
        resizeMode: 'contain',
    },
});
