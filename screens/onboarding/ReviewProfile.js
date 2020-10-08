import React, { useState, useRef } from 'react';
import { Text, View, Image, Platform, Alert, Animated, TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { LinearGradient } from 'expo-linear-gradient';
import Emoji from 'react-native-emoji';
import { useUserContext } from '../../contexts/UserContext';
import { Camera } from 'expo-camera';
import * as Linking from 'expo-linking';
import { darkGradient } from '../../constants/Colors';
import Loader from '../../components/Loader';
import { scaling, popup } from '../helpers';

//Import global styles used throughout app
import { globalStyles } from '../../styles/global';

export default function ReviewProfileScreen({ navigation }) {
    const emojiAnim1 = useRef(new Animated.Value(0)).current;
    const emojiAnim2 = useRef(new Animated.Value(0)).current;

    const photo = navigation.getParam('data');

    const {
        state: userState,
        doUploadProfileUser,
        formatUserForImageUpload,
    } = useUserContext();
    const { profileImg: contextProfileImg } = userState;
    const [profileImg, setProfileImg] = useState(contextProfileImg);
    const [isLoading, setIsLoading] = useState(false);

    async function doUploadProfile() {
        setIsLoading(true);
        const user = getUserForImageUpload();
        const isUploadedProfile = await doUploadProfileUser(user);
        setIsLoading(false);
        if (!isUploadedProfile) return;
        navigation.navigate('Welcome1');
    }

    function getUserForImageUpload() {
        const user = formatUserForImageUpload();
        user.image.uri = Platform.OS === 'android' ? profileImg : profileImg.replace('file://', '');
        return user;
    }

    async function checkPermission() {
        const { status } = await Camera.getPermissionsAsync();
        if (status === 'denied') {
            Alert.alert(popup.title, popup.message,
                [
                    { text: popup.btn1Text, style: 'cancel' },
                    { text: popup.btn2Text, onPress: () => Linking.openSettings()}
                ],
                { cancelable: false }
            );
        } else {
            navigation.navigate('TakeProfile');
        }
    }

    return (
        <>
            <View style={globalStyles.outerContainer}>
                <LinearGradient colors={darkGradient} style={globalStyles.gradientContainer}>
                    <SafeAreaView style={globalStyles.innerContainer}>
                        <View style={globalStyles.titleContainer}>
                            <Text style={globalStyles.whiteTitle}>Photo</Text>
                        </View>
                        <View style={globalStyles.paginationContainer}>
                            <Text style={globalStyles.transparentText}>Replace Text Here</Text>
                        </View>
                        <View style={globalStyles.contentContainerCard}>
                            <Image source={{ uri: photo.uri }} onLoad={() => setProfileImg(photo.uri)} style={globalStyles.cardContent} />
                        </View>
                        <View style={globalStyles.verifyContainer}>
                            <Text style={globalStyles.verify} onPress={checkPermission}>Retake photo</Text>
                        </View>
                        <View style={globalStyles.emojiTextContainer}>
                            <Text style={globalStyles.transparentEmojiText}>Replace Emoji Text Here</Text>
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
                    </SafeAreaView>
                </LinearGradient>
            </View>
            <Loader visible={isLoading} />
        </>
    );
}
