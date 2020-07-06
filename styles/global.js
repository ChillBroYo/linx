import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
	outerContainer: {
	},
	innerContainer: {
	},
	titleContainer: {
		top: 40
	},
	blackTitle: {
		textAlign: 'center',
		color: '#2B2D42',
		fontSize: 35
	},
	whiteTitle: {
		textAlign: 'center',
		color: '#FFF',
		fontSize: 35
	},
	paginationContainer: {
		alignItems: 'center',
		top: 55
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
		alignItems: 'center',
		backgroundColor: '#FFF',
		width: 340,
		height: 250,
		top: 85,
		left: 20,
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
		width: 285,
		top: 30,
		left: 10,
	},
	imageContent: {
		width: 330,
        height: 240,
        top: 5,
        resizeMode: 'contain'
	},
	blankContainer: {
		alignItems: 'center',
		backgroundColor: '#FFF',
		width: 280,
		height: 40,
		top: 65,
		left: 50,
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
		width: 280,
		height: 40,
		top: 65,
		left: 50,
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
		left: 50
	},
	verify: {
		fontSize: 23,
		color: '#FFF',
		top: 5
	},
	emojiContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		top: 90,
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
    	top: 175
  }
});
