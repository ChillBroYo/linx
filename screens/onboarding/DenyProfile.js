import React, { useRef } from 'react';
import { Text, View, Image, Alert, Animated, TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { LinearGradient } from 'expo-linear-gradient';
import Emoji from 'react-native-emoji';
import { Camera } from 'expo-camera';
import * as Linking from 'expo-linking';
import { darkGradient } from '../../constants/Colors';
import { scaling, popup } from '../helpers';

//Import global styles used throughout app
import { globalStyles } from '../../styles/global';

export default function DenyProfileScreen({ navigation }) {
    const emojiAnim1 = useRef(new Animated.Value(0)).current;
    const emojiAnim2 = useRef(new Animated.Value(0)).current;

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

    return(
        <View style={globalStyles.outerContainer}>
            <LinearGradient colors={darkGradient} style={globalStyles.gradientContainer}>
                <SafeAreaView style={globalStyles.innerContainer}>
                    <View style={globalStyles.titleContainer}>
                        <Text style={globalStyles.whiteTitle}>Are you real?</Text>
                    </View>
                    <View style={globalStyles.paginationContainer} />
                    <View style={globalStyles.contentContainerText}>
                        <Text style={globalStyles.content}>Are you sure you don't want to verify that you are a real person? {'\n'}{'\n'}
                        This will limit who you will be able to connect with.</Text>
                    </View>
                    <View style={globalStyles.verifyContainer}>
                        <Text style={globalStyles.verify} onPress={checkPermission}>Verify with photo</Text>
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
                            onPress={() => navigation.navigate('Welcome1')} style={scaling.scalingStyle(emojiAnim2)}
                        >
                            <Animated.View style={globalStyles.emojiSymbol}>
                                <Emoji name="+1" style={globalStyles.emojiStyle} />
                            </Animated.View>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        </View>
    );
}
