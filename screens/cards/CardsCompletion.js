import React, { useRef } from 'react';
import { Text, View, Image } from 'react-native';
import { LinearGradient} from 'expo-linear-gradient';
import Emoji from 'react-native-emoji';
import ConfettiCannon from 'react-native-confetti-cannon';

//Import global styles used throughout app
import { globalStyles } from '../../styles/global';

export default function CardsCompletionScreen({ navigation }) {

    let cannon = useRef();
    function shootCannon() {
        cannon.current.start();
    }

	return(
		<View style={globalStyles.outerContainer}>
      		<LinearGradient colors={['#439E73', 'rgba(254, 241, 2, 0)']} style={{height: '100%'}}>
      			<View style={globalStyles.innerContainer}>
                    <View style={globalStyles.titleContainer}>
                        <Text style={globalStyles.whiteTitle}>Please Wait</Text>
                    </View>
                    <View style={globalStyles.paginationContainer}>
                        <Text style={globalStyles.subtitleText}>until new cards are available</Text>
                    </View>
       				<View style={globalStyles.contentContainer}>
                        <Image source={require('../../assets/images/cards_completion.png')} style={globalStyles.imageContent} />
       				</View>
       				<View style={globalStyles.noContainer} />
       				<View style={globalStyles.emojiContainer}>
       					<View style={globalStyles.emojiSymbol}>
                        	<Emoji name="tada" style={globalStyles.emojiStyle} onPress={shootCannon} />
                    	</View>
                    </View>
                    <View style={globalStyles.confettiContainer}>
                        <ConfettiCannon count={100} origin={{ x: 175, y: 125 }} explosionSpeed={500} fallSpeed={2500} fadeOut={true}
                        autoStart={false} ref={cannon} />
                    </View>
  				</View>
  			</LinearGradient>
  		</View>
	);
}
