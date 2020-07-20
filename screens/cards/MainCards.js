import React, { useContext, useState, useLayoutEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import { LinearGradient} from 'expo-linear-gradient';
import Emoji from 'react-native-emoji';
import moment from 'moment';
import CardsCompletionScreen from './CardsCompletion';
import CardsTimerScreen from './CardsTimer';
import { getSymbols, timeDifference } from './helpers';
import { UserContext } from '../../contexts/UserContext';

//Import global styles used throughout app
import { globalStyles } from '../../styles/global';

export default function MainCardsScreen({ navigation }) {
    const {
        userId,
        doGetUserProfile,
        lastReaction: contextLastReaction,
        doGetImage,
        formatUserForReaction,
        doReactImage,
        formatUserForIndex,
        doUpdateImageIndex,
    } = useContext(UserContext);

    const [cardsReact, setCardsReact] = useState(0);
    const [imageIndex, setImageIndex] = useState(-1);
    const [lastReaction, setLastReaction] = useState(contextLastReaction);
    const [imageId, setImageId] = useState(-1);
    const [imageCategory, setImageCategory] = useState(6);
    const [imageLink, setImageLink] = useState('');

    let reactionTime = '';

    async function performGetProfile() {
        const user = { uid: userId, key: 123 };
        const result = await doGetUserProfile(user);

        if(!(result instanceof Object)) {
            navigation.navigate('SignIn');
        } else {
            setImageIndex(result.imageIndex);
        };
    }

    useLayoutEffect(() => {
        performGetProfile();
    }, []);

    async function performGetImage() {

        if(imageIndex % 15 == 0 && imageIndex != 0) {
            const diff = timeDifference(lastReaction);
            if(diff < 24 * 60 * 60) {
                setCardsReact(2);
                return;
            };
        };

        const image = { image_type: 'general', image_index: imageIndex };
        const result = await doGetImage(image);

        if(!(result instanceof Object)) {
            setCardsReact(1);
        } else {
            setImageId(result.imageId);
            setImageCategory(result.imageCategory);
            setImageLink(result.imageLink);
        };
    }

    useLayoutEffect(() => {
        if(imageIndex != -1) performGetImage();
    }, [imageIndex]);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeIn = Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true
    });
    const fadeOut = Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 750,
        useNativeDriver: true
    });

    function updateStates() {
        setLastReaction(reactionTime);
        setImageIndex(imageIndex + 1);
    }

    async function doReaction(reaction) {
        const [react, user] = getUserForReaction(reaction);
        const [didReact, didUpdateIndex] = await Promise.all([doReactImage(react), doUpdateImageIndex(user)]);
        if(!didReact || !didUpdateIndex) return;
        fadeOut.start(updateStates);
    }

    function getUserForReaction(reaction) {
        const react = formatUserForReaction(reaction, imageId);
        const user = formatUserForIndex(imageIndex + 1);
        reactionTime = moment.utc().format('YYYY-MM-DDTHH:mm:ss');
        user.info.lastReaction = reactionTime;
        return [react, user];
    }

    if(cardsReact == 1) {
        return (<CardsCompletionScreen navigation={ navigation } />);
    } else if(cardsReact == 2) {
        return (<CardsTimerScreen navigation={ navigation } lastReaction={ lastReaction } />);
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
                        <Animated.Image source={imageLink ? { uri: imageLink } : null} onLoad={() => fadeIn.start()}
                        style={[globalStyles.imageContent, {opacity: fadeAnim}]} />
       				</View>
       				<Animated.View style={[globalStyles.blankContainer, {opacity: fadeAnim}]} />
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
