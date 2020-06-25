import React, { useRef } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient} from 'expo-linear-gradient';
import Dots from 'react-native-dots-pagination';
import Emoji from 'react-native-emoji';
import ConfettiCannon from 'react-native-confetti-cannon';
import { UserContext } from '../../contexts/UserContext';

//Import global styles used throughout app
import { globalStyles } from '../../styles/global';

export default function ConfirmProfileScreen({ navigation}) {
  let cannon = useRef();
  let shoot = false;

  function shootCannon() {
    if (!shoot) {
      shoot = true;
      cannon.current.start();
    }
  }

  return(
    <View style={globalStyles.outerContainer}>
      <LinearGradient colors={['#439E73', 'rgba(254, 241, 2, 0)']} style={{height: '100%'}}>
        <View style={globalStyles.innerContainer}>
          <View style={globalStyles.titleContainer}>
            <Text style={globalStyles.whiteTitle}>Let's start!</Text>
          </View>
          <View style={globalStyles.paginationContainer}>
            <Image source={require('../../assets/icons/pagination_three.png')} style={globalStyles.paginationIcon} />
          </View>
          <View style={globalStyles.contentContainer}>
            <Text style={globalStyles.content}>Great. Let's connect you with some people!</Text>
          </View>
          <View style={globalStyles.noContainer} />
          <View style={globalStyles.emojiContainer}>
            <View style={globalStyles.emojiSymbol}>
              <Emoji name="tada" style={globalStyles.emojiStyle} onPress={shootCannon} />
            </View>
          </View>
          <View style={styles.confettiContainer}>
            <ConfettiCannon count={100} origin={{ x: 175, y: 125 }} explosionSpeed={500} fallSpeed={2500} fadeOut={true}
            autoStart={false} ref={cannon} onAnimationEnd={() => navigation.navigate('MainCards')} />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

//Styling of screen
const styles = StyleSheet.create({
  confettiContainer: {
    zIndex: 2,
    top: 175
  }
});