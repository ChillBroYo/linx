import React, { useState, useEffect, useRef } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { darkGradient } from '../../constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { popup2 } from '../helpers';
import * as Linking from 'expo-linking';
import Loader from '../../components/Loader';

//Import global styles used throughout app
import { globalStyles } from '../../styles/global';

export default function TakeProfileScreen({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);
    
    let camera = useRef();

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
            <View style={globalStyles.outerContainer}>
                <LinearGradient colors={darkGradient} style={{height: '100%'}} />
            </View>
        );
    }

    //Case when permission has been denied
    if (hasPermission === false) {
        navigation.navigate('DenyProfile');
    }

    async function snap() {
        setIsLoading(true);
        if (camera.current) {
            let photo = await camera.current.takePictureAsync();
            setIsLoading(false);
            navigation.navigate('ReviewProfile', { data: photo });
        }
    }

    async function selectImage() {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(popup2.title, popup2.message,
                [
                    { text: popup2.btn1Text, style: 'cancel' },
                    { text: popup2.btn2Text, onPress: () => Linking.openSettings()}
                ],
                { cancelable: false }
            );
        } else {
            setIsLoading(true);
            let photo = await ImagePicker.launchImageLibraryAsync();
            setIsLoading(false);
            if (!photo.cancelled) navigation.navigate('ReviewProfile', { data: photo });
        }
    }

    //Case when permission has been approved
    return (
        <>
            <View style={globalStyles.cameraContainer}>
                <View style={globalStyles.navigationButtonContainer}>
                    <TouchableOpacity style={globalStyles.backButtonContainer} onPress={() => navigation.goBack()}>
                        <Ionicons name="ios-arrow-back" style={globalStyles.backButton} />
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
                        <Ionicons name="ios-reverse-camera" style={globalStyles.flipCamera} />
                    </TouchableOpacity>
                </View>
            </View>
            <Loader visible={isLoading} />
        </>
    );
}
