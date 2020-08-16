import { StyleSheet } from 'react-native';
import {wp, hp} from './helpers';

export const globalStyles = StyleSheet.create({
	outerContainer: {
	},
	gradientContainer: {
		height: '100%'
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
		marginVertical: hp(20),
		height: 20
	},
	paginationIcon: {
		resizeMode: 'contain'
	},
	subtitleText: {
		textAlign: 'center',
		color: '#FFF',
		fontSize: 20
	},
	contentContainerText: {
		backgroundColor: '#FFF',
		width: wp(340),
		height: hp(380),
		paddingTop: hp(45),
		paddingHorizontal: wp(30),
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		zIndex: 1,
		alignItems: 'center',
	},
	contentContainerImg: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFF',
		width: wp(340),
		height: hp(380),
		paddingHorizontal: wp(30),
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		zIndex: 1
	},
	contentContainerCard: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFF',
		width: wp(340),
		height: hp(380),
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		zIndex: 1
	},
	content: {
		fontSize: 22,
		color: '#1B1B1B',
		marginBottom: hp(20)
	},
	imageContent: {
        resizeMode: 'contain',
	},
	cardContent: {
		width: wp(330),
		height: hp(330),
		resizeMode: 'contain'
	},
	cardDesc: {
		fontSize: 20,
		color: '#2B2D42'
	},
	blankContainer: {
		alignItems: 'center',
		backgroundColor: '#FFF',
		width: wp(280),
		height: hp(40),
		marginTop: -hp(20),
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 4,
		zIndex: 0
	},
	verifyContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#439E73',
		width: wp(280),
		height: hp(40),
		marginTop: -hp(20),
		paddingVertical: hp(7),
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
		width: wp(280),
		height: hp(40),
		marginTop: -hp(20)
	},
	verify: {
		fontSize: 20,
		color: '#FFF'
	},
	emojiContainer: {
		flexDirection: 'row',
		alignSelf: 'stretch',
		justifyContent: 'space-around',
		marginVertical: hp(25),
		elevation: 7,
		zIndex: 3
	},
	emojiSymbol: {
	},
	emojiStyle: {
		fontSize: 80
	},
	confettiContainer: {
		elevation: 6,
    	zIndex: 2,
    	bottom: -80,
    	alignSelf: 'flex-start'
  	},
  	cameraContainer: {
        flex: 1
    },
    navigationButtonContainer: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center'
    },
    backButtonContainer: {
        marginLeft: hp(35)
    },
    backButton: {
        color: 'white',
        fontSize: 50,
    },
    camera: {
        flex: 5
    },
    cameraButtonContainer: {
        flex: 1,
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    noIcon: {
    	width: 50
    },
    takePictureContainer: {
    },
    takePicture: {
        fontSize: 100,
        color: 'white',
    },
    flipCameraContainer: {
    },
    flipCamera: {
        fontSize: 50,
        color: 'white',
    }
});
