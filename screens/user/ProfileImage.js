import React, { useContext, useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../../contexts/UserContext';

export default function UserProfileImage({ navigation }) {
    const {
        doUploadProfileUser,
        formatUserForImageUpload,
    } = useContext(UserContext);

    //Variables to determine if permission is granted by user to access camera
    const [hasPermission, setHasPermission] = useState(null);

    //Variables to determine if front camera or back camera is being used
    const [type, setType] = useState(Camera.Constants.Type.back);

    //Hook to update status of camera permission based on user input
    useEffect(() => {
        (async () => {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            setHasPermission(status == 'granted');
        })();
    }, []);

    //Case when permission has neither been approved nor denied
    if (hasPermission == null) {
        return <View />;
    }

    //Case when permission has been denied
    if (hasPermission == false) {
        navigation.goBack();
    }

    snap = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            doUploadProfile(photo.uri);
        }
    };

    async function doUploadProfile(photo) {
        const user = getUserForImageUpload(photo);
        const isUploadedProfile = await doUploadProfileUser(user);
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
        <View style={styles.cameraContainer}>
            <Camera style={styles.camera} type={type} flashMode={'auto'} ref={ref => { this.camera = ref; }} >
                <View style={styles.navigationButtonContainer}>
                    <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigation.goBack()}>
                        <Ionicons name="ios-arrow-back" style={styles.backButton} />
                    </TouchableOpacity>
                </View>
                <View style={styles.cameraButtonContainer}>
                    <TouchableOpacity style={styles.takePictureContainer} onPress={this.snap}>
                        <Ionicons name="ios-camera" style={styles.takePicture} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.flipCameraContainer}
                        onPress={() => {
                            setType(type == Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                            )
                        }}
                    >
                        <Ionicons name="ios-reverse-camera" style={styles.flipCamera} />
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}

//Styling of screen
const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1
    },
    camera: {
        flex: 1
    },
    navigationButtonContainer: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'flex-start',
    },
    backButtonContainer: {
        marginTop: 15,
        marginLeft: 25
    },
    backButton: {
        color: 'white',
        fontSize: 50,
    },
    cameraButtonContainer: {
        flex: 1,
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        marginTop: 485
    },
    takePictureContainer: {
        marginLeft: 120
    },
    takePicture: {
        fontSize: 100,
        marginBottom: 0,
        color: 'white',
    },
    flipCameraContainer: {
    },
    flipCamera: {
        fontSize: 50,
        marginBottom: 10,
        color: 'white',
    },
});
