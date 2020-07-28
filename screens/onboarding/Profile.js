import React from 'react';
import { Text, View, Image, Alert } from 'react-native';
import { LinearGradient} from 'expo-linear-gradient';
import Emoji from 'react-native-emoji';
import { Camera } from 'expo-camera';
import * as Linking from 'expo-linking';

//Import global styles used throughout app
import { globalStyles } from '../../styles/global';

export default function ProfileScreen({ navigation }) {

    async function checkPermission() {
        const { status } = await Camera.getPermissionsAsync();
        if (status === 'denied') {
            Alert.alert('Permission Denied',
                'Linx currently does not have permission to access Camera. Please go into Settings to grant Linx access.',
                [
                    { text: 'OK', style: 'cancel' },
                    { text: 'Settings', onPress: () => Linking.openSettings()}
                ],
                { cancelable: false }
            );
        } else {
            navigation.navigate('TakeProfile');
        }
    }

    return (
        <View style={globalStyles.outerContainer}>
            <LinearGradient colors={['#439E73', 'rgba(254, 241, 2, 0)']} style={{height: '100%'}}>
                <View style={globalStyles.innerContainer}>
                    <View style={globalStyles.titleContainer}>
                        <Text style={globalStyles.whiteTitle}>Are you real?</Text>
                    </View>
                    <View style={globalStyles.paginationContainer}>
                        <Image source={require('../../assets/icons/pagination_two.png')} style={globalStyles.paginationIcon} />
                    </View>
                    <View style={globalStyles.contentContainer}>
                        <Text style={globalStyles.content}>Take your profile picture to verify that you are a real person.
                        While photos aren't mandatory, if you don't have a photo, we will only connect you with others that don't have photos.</Text>
                    </View>
                    <View style={globalStyles.blankContainer} />
                    <View style={globalStyles.emojiContainer}>
                        <View style={globalStyles.emojiSymbol}>
                            <Emoji name="-1" style={globalStyles.emojiStyle} onPress={() => navigation.navigate('DenyProfile')} />
                        </View>
                        <View style={globalStyles.emojiSymbol}>
                            <Emoji name="+1" style={globalStyles.emojiStyle} onPress={checkPermission} />
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}
