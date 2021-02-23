import React, { useState, useEffect, useRef } from 'react';
import { Alert, Text, TouchableOpacity, View, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { pageStyles } from './common';
import { lightGradient } from '../../constants/Colors';
import Loader from '../../components/Loader';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useUserContext } from '../../contexts/UserContext';
import * as ImagePicker from 'expo-image-picker';
import { popup2 } from '../helpers';
import * as Linking from 'expo-linking';

//Import global styles used throughout app
import { globalStyles } from '../../styles/global';

export default function UserProfileImage({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);

    let camera = useRef();

    const {
        doUploadProfileUser,
        formatUserForImageUpload,
    } = useUserContext();

    //Variables to determine if permission is granted by user to access camera
    const [hasPermission, setHasPermission] = useState(null);

    //Variables to determine if front camera or back camera is being used
    const [type, setType] = useState(Camera.Constants.Type.back);

    //Hook to update status of camera permission based on user input
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    //Case when permission has neither been approved nor denied
    if (hasPermission === null) {
        return (
            <View style={pageStyles.container}>
                <LinearGradient colors={lightGradient} style={pageStyles.container} />
            </View>
        );
    }

    //Case when permission has been denied
    if (hasPermission === false) {
        navigation.goBack();
    }

    async function snap() {
        if (camera.current) {
            let photo = await camera.current.takePictureAsync();
            doUploadProfile(photo.uri);
        }
    }

    async function selectImage() {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(popup2.title, popup2.message,
                [
                    { text: popup2.btn1Text, style: 'cancel' },
                    { text: popup2.btn2Text, onPress: () => Linking.openSettings()}
                ],
                { cancelable: false }
            );
        } else {
            let photo = await ImagePicker.launchImageLibraryAsync();
            if (!photo.cancelled) doUploadProfile(photo.uri);
        }
    }

    async function doUploadProfile(photo) {
        setIsLoading(true);
        const user = getUserForImageUpload(photo);
        const isUploadedProfile = await doUploadProfileUser(user);
        setIsLoading(false);
        if (!isUploadedProfile) return;
        navigation.goBack();
    }

    function getUserForImageUpload(photo) {
        const user = formatUserForImageUpload();
        user.image.uri = Platform.OS === 'android' ? photo : photo.replace('file://', '');
        return user;
    }

    //Case when permission has been approved
    return (
        <>
            <View style={globalStyles.cameraContainer}>
                <View style={globalStyles.navigationButtonContainer}>
                    <TouchableOpacity style={globalStyles.backButtonContainer} onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios" style={globalStyles.backButton} />
                    </TouchableOpacity>
                </View>
                <Camera style={globalStyles.camera} type={type} ref={camera} />
                <View style={globalStyles.cameraButtonContainer}>
                    <TouchableOpacity style={globalStyles.selectPictureContainer} onPress={selectImage}>
                        <Ionicons name="ios-albums" style={globalStyles.selectPicture} />
                    </TouchableOpacity>
                    <TouchableOpacity style={globalStyles.takePictureContainer} onPress={snap}>
                        <Ionicons name="ios-camera" style={globalStyles.takePicture} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={globalStyles.flipCameraContainer}
                        onPress={() => {
                            setType(type == Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                            )
                        }}
                    >
                        <Ionicons name="ios-camera-reverse" style={globalStyles.flipCamera} />
                    </TouchableOpacity>
                </View>
            </View>
            <Loader visible={isLoading} />
        </>
    );
}
