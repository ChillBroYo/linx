import React, { useState, useEffect, useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { darkGradient } from '../../constants/Colors';

//Import global styles used throughout app
import { globalStyles } from '../../styles/global';

export default function TakeProfileScreen({ navigation }) {
    
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
        if (camera.current) {
            let photo = await camera.current.takePictureAsync();
            navigation.navigate('ReviewProfile', {data: photo});
        }
    }

    //Case when permission has been approved
    return (
        <View style={globalStyles.cameraContainer}>
            <View style={globalStyles.navigationButtonContainer}>
                <TouchableOpacity style={globalStyles.backButtonContainer} onPress={() => navigation.goBack()}>
                    <Ionicons name="ios-arrow-back" style={globalStyles.backButton} />
                </TouchableOpacity>
            </View>
            <Camera style={globalStyles.camera} type={type} ref={camera} />
            <View style={globalStyles.cameraButtonContainer}>
                <View style={globalStyles.noIcon} />
                <TouchableOpacity style={globalStyles.takePictureContainer} onPress={snap}>
                    <Ionicons name="ios-camera" style={globalStyles.takePicture} />
                </TouchableOpacity>
                {<TouchableOpacity
                    style={globalStyles.flipCameraContainer}
                    onPress={() => {
                        setType(type == Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                        )
                    }}
                >
                    <Ionicons name="ios-reverse-camera" style={globalStyles.flipCamera} />
                </TouchableOpacity>}
            </View>
        </View>
    );
}
