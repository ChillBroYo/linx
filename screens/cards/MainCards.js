import React, { useState, useLayoutEffect, useRef } from 'react';
import { Text, View, Image, Animated, TouchableOpacity, Share } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { LinearGradient } from 'expo-linear-gradient';
import Emoji from 'react-native-emoji';
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CardsCompletionScreen from './CardsCompletion';
import CardsTimerScreen from './CardsTimer';
import { getSymbols, timeDifference, fadeInVals, fadeOutVals } from './helpers';
import { useUserContext } from '../../contexts/UserContext';
import { darkGradient } from '../../constants/Colors';
import { scaling } from '../helpers';
import { stdHeight } from '../../styles/helpers';
import { RFValue } from 'react-native-responsive-fontsize';
import Loader from '../../components/Loader';

//Import global styles used throughout app
import { globalStyles } from '../../styles/global';

export default function MainCardsScreen({ navigation }) {
    const {
        state: {
            userId,
            lastReaction: contextLastReaction,
        },
        doGetImage,
        doGetUserProfile,
        doReactImage,
        doUpdateImageIndex,
        formatUserForIndex,
        formatUserForReaction,
    } = useUserContext();
    const [cardsReact, setCardsReact] = useState(0);
    const [imageIndex, setImageIndex] = useState(-1);
    const [lastReaction, setLastReaction] = useState(contextLastReaction);
    const [imageId, setImageId] = useState(-1);
    const [imageCategory, setImageCategory] = useState(6);
    const [imageLink, setImageLink] = useState('');
    const [imageMessage, setImageMessage] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    useLayoutEffect(() => {
        performGetProfile();
    }, []);

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
        if(imageIndex != -1) performGetImage();
    }, [imageIndex]);

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
            setImageMessage(result.imageMessage);
        };
    }

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeIn = Animated.timing(fadeAnim, fadeInVals);
    const fadeOut = Animated.timing(fadeAnim, fadeOutVals);

    const emojiAnim1 = useRef(new Animated.Value(0)).current;
    const emojiAnim2 = useRef(new Animated.Value(0)).current;

    function updateStates() {
        const reactionTime = moment.utc().format('YYYY-MM-DDTHH:mm:ss');
        setLastReaction(reactionTime);
        setImageIndex(imageIndex + 1);
    }

    async function doReaction(reaction) {
        setIsLoading(true);
        const [react, user] = getUserForReaction(reaction);
        const [didReact, didUpdateIndex] = await Promise.all([doReactImage(react), doUpdateImageIndex(user)]);
        setIsLoading(false);
        if(!didReact || !didUpdateIndex) return;
        fadeOut.start(updateStates);
    }

    function getUserForReaction(reaction) {
        const react = formatUserForReaction(reaction, imageId);
        const user = formatUserForIndex(imageIndex + 1);
        const reactionTime = moment.utc().format('YYYY-MM-DDTHH:mm:ss');
        user.info.lastReaction = reactionTime;
        return [react, user];
    }

    async function shareImage() {
        try {
            const result = await Share.share({
                message: `Check out this meme from Linx (getlinxnow.com) \n${imageLink}`,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
            // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }

    if(cardsReact == 1) {
        return (<CardsCompletionScreen navigation={ navigation } />);
    } else if(cardsReact == 2) {
        return (<CardsTimerScreen navigation={ navigation } lastReaction={ lastReaction } />);
    };

    const symbols = getSymbols(imageCategory);

	return (
        <>
    		<View style={globalStyles.outerContainer}>
          		<LinearGradient colors={darkGradient} style={globalStyles.gradientContainer}>
          			<SafeAreaView style={globalStyles.innerContainer}>
                        <Animated.View style={[globalStyles.iconContainer, {opacity: fadeAnim}]}>
                            <MaterialCommunityIcons name='flag-variant' size={RFValue(25, stdHeight)} color='#FFF'
                                onPress={() => navigation.navigate('ReportImage', {imageId, imageIndex, onGoBack: () => fadeOut.start(updateStates)})}
                            />
                            <MaterialCommunityIcons name='share' size={RFValue(25, stdHeight)} color='#FFF' onPress={shareImage} />
                        </Animated.View>
                        <Animated.View style={[globalStyles.paginationContainer, {opacity: fadeAnim}]}>
                            <Text style={globalStyles.subtitleText}>{(imageIndex % 15) + 1} / 15</Text>
                        </Animated.View>
           				<View style={globalStyles.contentContainerCard}>
                            <Animated.Image source={imageLink ? { uri: imageLink } : null} onLoad={() => fadeIn.start()}
                                style={[globalStyles.cardContent, {opacity: fadeAnim}]} />
                            {(imageMessage && imageMessage != null)
                                ? <Animated.Text style={[globalStyles.cardDesc, {opacity: fadeAnim}]}>{imageMessage}</Animated.Text>
                                : null
                            }
           				</View>
           				<Animated.View style={[globalStyles.blankContainer, {opacity: fadeAnim}]}>
                            <Text style={globalStyles.transparentVerify}>Enter Verify Here</Text>
                        </Animated.View>
                        <Animated.View style={[globalStyles.emojiTextContainer, {opacity: fadeAnim}]}>
                            <Text style={globalStyles.transparentEmojiText}>Replace Emoji Text Here</Text>
                        </Animated.View>
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
            <Loader visible={isLoading} />
        </>
	);
}
