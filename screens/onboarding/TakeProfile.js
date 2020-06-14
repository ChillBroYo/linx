import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

export default function TakeProfileScreen({ navigation }) {
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
        }
    };

    //Case when permission has been approved
    return (
        <View style={styles.cameraContainer}>
            <Camera style={styles.camera} type={type} flashMode={'auto'} ref={ref => { this.camera = ref; }} >
                <View style={styles.cameraButtonContainer}>
                    <TouchableOpacity style={styles.takePictureContainer}>
                    </TouchableOpacity>
                        <Text style={styles.takePicture}>Take Picture</Text>
                    <TouchableOpacity
                        style={styles.flipCameraContainer}
                        onPress={() => {
                            setType(type == Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                            )
                        }}
                    >
                        <Text style={styles.flipCamera}>Flip</Text>
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
    cameraButtonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end'
    },
    takePictureContainer: {

    },
    takePicture: {
        fontSize: 30,
        marginBottom: 75,
        color: 'white'
    },
    flipCameraContainer: {
    },
    flipCamera: {
        fontSize: 30,
        marginBottom: 75,
        color: 'white',
    },
});
