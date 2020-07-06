import React, { useContext, useState } from 'react';
import { Text, View, Image, Platform } from 'react-native';
import { LinearGradient} from 'expo-linear-gradient';
import Emoji from 'react-native-emoji';
import { UserContext } from '../../contexts/UserContext';

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
                        <Text style={globalStyles.verify} onPress={() => navigation.navigate('TakeProfile')}>Retake photo</Text>
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