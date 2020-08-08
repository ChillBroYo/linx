import React, { useContext, useState } from 'react';
import { Text, View, Image, Platform, Alert } from 'react-native';
import { LinearGradient} from 'expo-linear-gradient';
import Emoji from 'react-native-emoji';
import { UserContext } from '../../contexts/UserContext';
import { Camera } from 'expo-camera';
import * as Linking from 'expo-linking';

//Import global styles used throughout app
import { globalStyles } from '../../styles/global';

export default function ReviewProfileScreen({ navigation }) {

    const photo = navigation.getParam('data');

    const {
        profileImg: contextProfileImg,
        setProfileImg: setContextProfileImg,
        doUploadProfileUser,
        formatUserForImageUpload,
    } = useContext(UserContext);
    const [profileImg, setProfileImg] = useState(contextProfileImg);

    async function doUploadProfile() {
        const user = getUserForImageUpload();
        const isUploadedProfile = await doUploadProfileUser(user);
        if (!isUploadedProfile) return;
        navigation.navigate('ConfirmProfile');
    }

    function getUserForImageUpload() {
        const user = formatUserForImageUpload();
        user.image.uri = Platform.OS === 'android' ? profileImg : profileImg.replace('file://', '');
        return user;
    }

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
                        <Text style={globalStyles.whiteTitle}>Photo</Text>
                    </View>
                    <View style={globalStyles.paginationContainer}>
                        <Image source={require('../../assets/icons/pagination_two.png')} style={globalStyles.paginationIcon} />
                    </View>
                    <View style={globalStyles.contentContainer}>
                        <Image source={{ uri: photo.uri }} onLoad={() => setProfileImg(photo.uri)} style={globalStyles.imageContent} />
                    </View>
                    <View style={globalStyles.verifyContainer}>
                        <Text style={globalStyles.verify} onPress={checkPermission}>Retake photo</Text>
                    </View>
                    <View style={globalStyles.emojiContainer}>
                        <View style={globalStyles.emojiSymbol}>
                            <Emoji name="-1" style={globalStyles.emojiStyle} onPress={() => navigation.navigate('Profile')} />
                        </View>
                        <View style={globalStyles.emojiSymbol}>
                            <Emoji name="+1" style={globalStyles.emojiStyle} onPress={doUploadProfile} />
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}
