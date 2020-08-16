import React, { useContext, useState, useRef } from 'react';
import { Text, View, Image, Platform, Alert, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Emoji from 'react-native-emoji';
import { UserContext } from '../../contexts/UserContext';
import { Camera } from 'expo-camera';
import * as Linking from 'expo-linking';
import { darkGradient } from '../../constants/Colors';
import { scaling } from '../helpers';

//Import global styles used throughout app
import { globalStyles } from '../../styles/global';

export default function ReviewProfileScreen({ navigation }) {
    const emojiAnim1 = useRef(new Animated.Value(0)).current;
    const emojiAnim2 = useRef(new Animated.Value(0)).current;

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
            <LinearGradient colors={darkGradient} style={{height: '100%'}}>
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
                        <TouchableOpacity onPressIn={() => scaling.pressInAnim(emojiAnim1)} onPressOut={() => scaling.pressOutAnim(emojiAnim1)}
                            onPress={() => navigation.navigate('Profile')} style={scaling.scalingStyle(emojiAnim1)}
                        >
                            <Animated.View style={globalStyles.emojiSymbol}>
                                <Emoji name="-1" style={globalStyles.emojiStyle} />
                            </Animated.View>
                        </TouchableOpacity>
                        <TouchableOpacity onPressIn={() => scaling.pressInAnim(emojiAnim2)} onPressOut={() => scaling.pressOutAnim(emojiAnim2)}
                            onPress={doUploadProfile} style={scaling.scalingStyle(emojiAnim2)}
                        >
                            <Animated.View style={globalStyles.emojiSymbol}>
                                <Emoji name="+1" style={globalStyles.emojiStyle} />
                            </Animated.View>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}
