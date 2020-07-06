import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient} from 'expo-linear-gradient';
import Emoji from 'react-native-emoji';
import CardsCompletionScreen from './CardsCompletion';
import { getSymbols } from './helpers';
import { UserContext } from '../../contexts/UserContext';

//Import global styles used throughout app
import { globalStyles } from '../../styles/global';

export default function MainCardsScreen({ navigation }) {
    const {
        token,
        userId,
        doGetUserProfile,
        imageIndex,
        imageId,
        imageCategory,
        imageLink,
        doGetImage,
        formatUserForReaction,
        doReactImage,
    } = useContext(UserContext);

    const [cardsReact, setCardsReact] = useState(true);

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

    const symbols = getSymbols(imageCategory);

    async function doReaction(reaction) {
        const user = formatUserForReaction(reaction);
        const didReact = await doReactImage(user);
        if(!didReact) return;
    }

    if(!cardsReact) {
        return (<CardsCompletionScreen navigation={ navigation } />);
    };

	return(
		<View style={globalStyles.outerContainer}>
      		<LinearGradient colors={['#439E73', 'rgba(254, 241, 2, 0)']} style={{height: '100%'}}>
      			<View style={globalStyles.innerContainer}>
                    <View style={styles.noTitleContainer} />
                    <View style={globalStyles.paginationContainer}>
                        <Text style={globalStyles.subtitleText}>{imageIndex + 1} / 15</Text>
                    </View>
       				<View style={globalStyles.contentContainer}>
                        <Image source={{ uri: imageLink }} style={globalStyles.imageContent} />
       				</View>
       				<View style={globalStyles.blankContainer} />
       				<View style={globalStyles.emojiContainer}>
       					<View style={globalStyles.emojiSymbol}>
                        	<Emoji name={symbols[0]} style={globalStyles.emojiStyle} onPress={() => doReaction(1)} />
                    	</View>
                        <View style={globalStyles.emojiSymbol}>
                            <Emoji name={symbols[1]} style={globalStyles.emojiStyle} onPress={() => doReaction(2)} />
                        </View>
                    </View>
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