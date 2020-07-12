import React, { useContext, useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import { LinearGradient} from 'expo-linear-gradient';
import Emoji from 'react-native-emoji';
import CardsCompletionScreen from './CardsCompletion';
import { getSymbols } from './helpers';
import { UserContext } from '../../contexts/UserContext';

//Import global styles used throughout app
import { globalStyles } from '../../styles/global';

export default function MainCardsScreen({ navigation }) {
    const {
        userId,
        doGetUserProfile,
        imageIndex,
        doGetImage,
        imageCategory,
        imageLink,
        formatUserForReaction,
        doReactImage,
        formatUserForIndex,
        doUpdateImageIndex,
    } = useContext(UserContext);

    const [cardsReact, setCardsReact] = useState(true);
    const [refresh, setRefresh] = useState(0);

    async function performAPICalls() {
        const user = { uid: userId, key: 123 };
        const didGetProfile = await doGetUserProfile(user);
        if(!didGetProfile) navigation.navigate('SignIn');

        const image = { image_type: 'general', image_index: imageIndex };
        const didGetImage = await doGetImage(image);
        if(!didGetImage) setCardsReact(false);
    }

    useEffect(() => {
        performAPICalls();
    });

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeIn = Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
    });
    const fadeOut = Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
    });

    async function doReaction(reaction) {
        const [react, user] = getUserForReaction(reaction);
        const [didReact, didUpdateIndex] = await Promise.all([doReactImage(react), doUpdateImageIndex(user)]);
        if(!didReact || !didUpdateIndex) return;
        fadeOut.start(() => {setRefresh(refresh + 1)});
    }

    function getUserForReaction(reaction) {
        const react = formatUserForReaction(reaction);
        const user = formatUserForIndex();
        user.image_index = imageIndex + 1;
        return [react, user];
    }

    if(!cardsReact) {
        return (<CardsCompletionScreen navigation={ navigation } />);
    } else {
        fadeIn.start();
    };

    const symbols = getSymbols(imageCategory);

	return(
		<View style={globalStyles.outerContainer}>
      		<LinearGradient colors={['#439E73', 'rgba(254, 241, 2, 0)']} style={{height: '100%'}}>
      			<View style={globalStyles.innerContainer}>
                    <View style={styles.noTitleContainer} />
                    <Animated.View style={[globalStyles.paginationContainer, {opacity: fadeAnim}]}>
                        <Text style={globalStyles.subtitleText}>{imageIndex + 1} / 15</Text>
                    </Animated.View>
       				<View style={globalStyles.contentContainer}>
                        <Animated.Image source={{ uri: imageLink }} style={[globalStyles.imageContent, {opacity: fadeAnim}]} />
       				</View>
       				<View style={globalStyles.blankContainer} />
       				<Animated.View style={[globalStyles.emojiContainer, {opacity: fadeAnim}]}>
       					<View style={globalStyles.emojiSymbol}>
                        	<Emoji name={symbols[0]} style={globalStyles.emojiStyle} onPress={() => doReaction(1)} />
                    	</View>
                        <View style={globalStyles.emojiSymbol}>
                            <Emoji name={symbols[1]} style={globalStyles.emojiStyle} onPress={() => doReaction(2)} />
                        </View>
                    </Animated.View>
  				</View>
  			</LinearGradient>
  		</View>
	);
}

const styles = StyleSheet.create({
    noTitleContainer: {
        height: 35
    }
});
