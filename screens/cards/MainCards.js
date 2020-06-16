import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient} from 'expo-linear-gradient';
import Emoji from 'react-native-emoji';

//Import global styles used throughout app
import { globalStyles } from '../../styles/global';

export default function MainCardsScreen({ navigation }) {
	return(
		<View style={globalStyles.outerContainer}>
      		<LinearGradient colors={['#439E73', 'rgba(254, 241, 2, 0)']} style={{height: '100%'}}>
      			<View style={globalStyles.innerContainer}>
       				<View style={globalStyles.cardsContainer}>
       				</View>
       				<View style={globalStyles.cardsSubContainer} />
       				<View style={globalStyles.cardsEmojiContainer}>
       					<View style={globalStyles.mojiSymbol}>
                        	<Emoji name="neutral_face" style={globalStyles.emojiStyle} />
                    	</View>
                        <View style={globalStyles.emojiSymbol}>
                            <Emoji name="joy" style={globalStyles.emojiStyle} />
                        </View>
                    </View>
  				</View>
  			</LinearGradient>
  		</View>
	);
}