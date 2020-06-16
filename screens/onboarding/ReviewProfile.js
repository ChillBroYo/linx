import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { LinearGradient} from 'expo-linear-gradient';
import Emoji from 'react-native-emoji';

//Import global styles used throughout app
import { globalStyles } from '../../styles/global';

export default function ReviewProfileScreen({ navigation }) {

    const photo = navigation.getParam('data');
    console.log(photo.uri);

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
                        <Image source={{ uri: photo.uri }} style={styles.profile} />
                    </View>
                    <View style={globalStyles.verifyContainer}>
                        <Text style={globalStyles.verify} onPress={() => navigation.navigate('TakeProfile')}>Retake photo</Text>
                    </View>
                    <View style={globalStyles.emojiContainer}>
                        <View style={globalStyles.emojiSymbol}>
                            <Emoji name="-1" style={globalStyles.emojiStyle} onPress={() => navigation.navigate('Profile')} />
                        </View>
                        <View style={globalStyles.emojiSymbol}>
                            <Emoji name="+1" style={globalStyles.emojiStyle} onPress={() => navigation.navigate('ConfirmProfile')} />
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    profile: {
        width: 290,
        height: 200,
        top: 15,
        resizeMode: 'contain'
    }
});