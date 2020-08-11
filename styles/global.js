import { StyleSheet } from 'react-native';
import {wp, hp} from './helpers';

export const globalStyles = StyleSheet.create({
	outerContainer: {
	},
	innerContainer: {
		alignItems: 'center'
	},
	titleContainer: {
		top: hp(20),
	},
	noTitleContainer: {
		top: hp(20),
		height: 35
	},
	blackTitle: {
		color: '#2B2D42',
		fontSize: 35
	},
	whiteTitle: {
		color: '#FFF',
		fontSize: 35
	},
	paginationContainer: {
		marginVertical: hp(30)
	},
	paginationIcon: {
		resizeMode: 'contain'
	},
	subtitleText: {
		textAlign: 'center',
		color: '#FFF',
		fontSize: 20
	},
	contentContainer: {
		//alignItems: 'center',
		backgroundColor: '#FFF',
		width: wp(340),
		height: hp(380),
		padding: 30,
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		zIndex: 1
	},
	content: {
		fontSize: 23,
		color: '#1B1B1B',
		//width: 285,
		//top: 30,
	},
	imageContent: {
		width: wp(330),
        height: hp(330),
        top: 5,
        resizeMode: 'contain',
	},
	blankContainer: {
		alignItems: 'center',
		backgroundColor: '#FFF',
		width: wp(280),
		height: hp(40),
		marginTop: 0,
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		zIndex: 0
	},
	verifyContainer: {
		alignItems: 'center',
		backgroundColor: '#439E73',
		width: wp(280),
		height: hp(40),
		top: 65,
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		zIndex: 1
	},
	noContainer: {
		backgroundColor: 'transparent',
		width: 280,
		height: 40,
		top: 65,
	},
	verify: {
		fontSize: 23,
		color: '#FFF',
		top: 5
	},
	emojiContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		//marginBottom: hp(0),
		zIndex: 3
	},
	emojiSymbol: {
	},
	emojiStyle: {
		fontSize: 80,
		textShadowColor: 'rgba(0, 0, 0, 0.25)',
		textShadowOffset: {width: 0, height: 4},
		textShadowRadius: 4
	},
	confettiContainer: {
    	zIndex: 2,
    	top: 175,
    	alignItems: 'center'
  }
});
