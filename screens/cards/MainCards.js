import React, { useContext, useState, useLayoutEffect, useRef } from 'react';
import { Text, View, Image, Animated, TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { LinearGradient } from 'expo-linear-gradient';
import Emoji from 'react-native-emoji';
import moment from 'moment';
import CardsCompletionScreen from './CardsCompletion';
import CardsTimerScreen from './CardsTimer';
import { getSymbols, timeDifference, fadeInVals, fadeOutVals } from './helpers';
import { UserContext } from '../../contexts/UserContext';
import { darkGradient } from '../../constants/Colors';
import { scaling } from '../helpers';

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
    const fadeIn = Animated.timing(fadeAnim, fadeInVals);
    const fadeOut = Animated.timing(fadeAnim, fadeOutVals);

    const emojiAnim1 = useRef(new Animated.Value(0)).current;
    const emojiAnim2 = useRef(new Animated.Value(0)).current;

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
      		<LinearGradient colors={darkGradient} style={globalStyles.gradientContainer}>
      			<SafeAreaView style={globalStyles.innerContainer}>
                    <View style={globalStyles.noTitleContainer} />
                    <Animated.View style={[globalStyles.paginationContainer, {opacity: fadeAnim}]}>
                        <Text style={globalStyles.subtitleText}>{(imageIndex % 15) + 1} / 15</Text>
                    </Animated.View>
       				<View style={globalStyles.contentContainerCard}>
                        <Animated.Image source={imageLink ? { uri: imageLink } : null} onLoad={() => fadeIn.start()}
                            style={[globalStyles.cardContent, {opacity: fadeAnim}]} />

                        {/*Area of screen that displayes description of card*/}
                        {/*Need to wait for cards to have descriptions before implementing*/}
                        {/*<Animated.Text style={[globalStyles.cardDesc, {opacity: fadeAnim}]}>Test Description</Animated.Text>*/}
                        
       				</View>
       				<Animated.View style={[globalStyles.blankContainer, {opacity: fadeAnim}]} />
       				<Animated.View style={[globalStyles.emojiContainer, {opacity: fadeAnim}]}>
                        <TouchableOpacity onPressIn={() => scaling.pressInAnim(emojiAnim1)} onPressOut={() => scaling.pressOutAnim(emojiAnim1)}
                            onPress={() => doReaction(1)} style={scaling.scalingStyle(emojiAnim1)}
                        >
           					<Animated.View style={globalStyles.emojiSymbol}>
                            	<Emoji name={symbols[0]} style={globalStyles.emojiStyle} />
                        	</Animated.View>
                        </TouchableOpacity>
                        <TouchableOpacity onPressIn={() => scaling.pressInAnim(emojiAnim2)} onPressOut={() => scaling.pressOutAnim(emojiAnim2)}
                            onPress={() => doReaction(2)} style={scaling.scalingStyle(emojiAnim2)}
                        >
                            <Animated.View style={globalStyles.emojiSymbol}>
                                <Emoji name={symbols[1]} style={globalStyles.emojiStyle} />
                            </Animated.View>
                        </TouchableOpacity>
                    </Animated.View>
  				</SafeAreaView>
  			</LinearGradient>
  		</View>
	);
}
