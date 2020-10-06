import { StyleSheet } from 'react-native';
import {wp, hp, stdHeight} from './helpers';
import { RFValue } from 'react-native-responsive-fontsize';

export const globalStyles = StyleSheet.create({
	outerContainer: {
	},
	gradientContainer: {
		height: '100%'
	},
	innerContainer: {
		alignItems: 'center'
	},
	iconContainer: {
		top: hp(20),
		height: RFValue(42, stdHeight),
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignSelf: 'stretch'
	},
	titleContainer: {
		top: hp(20),
		//height: RFValue(35, stdHeight)
	},
	blackTitle: {
		color: '#2B2D42',
		fontSize: RFValue(35, stdHeight)
	},
	whiteTitle: {
		color: '#FFF',
		fontSize: RFValue(35, stdHeight)
	},
	transparentTitle: {
		color: 'transparent',
		fontSize: RFValue(35, stdHeight)
	},
	paginationContainer: {
		marginVertical: hp(20),
		//height: RFValue(20, stdHeight)
	},
	paginationIcon: {
		resizeMode: 'contain'
	},
	subtitleText: {
		textAlign: 'center',
		color: '#FFF',
		fontSize: RFValue(20, stdHeight)
	},
	transparentText: {
		textAlign: 'center',
		color: 'transparent',
		fontSize: RFValue(20, stdHeight)
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
		fontSize: RFValue(22, stdHeight),
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
		fontSize: RFValue(20, stdHeight),
		color: '#2B2D42'
	},
	blankContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFF',
		width: wp(280),
		marginTop: -RFValue(20, stdHeight),
		paddingVertical: hp(7),
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
		marginTop: -RFValue(20, stdHeight),
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
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent',
		width: wp(280),
		marginTop: -RFValue(20, stdHeight),
		paddingVertical: hp(7),
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		zIndex: 1	
	},
	verify: {
		fontSize: RFValue(20, stdHeight),
		color: '#FFF'
	},
	transparentVerify: {
		fontSize: RFValue(20, stdHeight),
		color: 'transparent'
	},
	emojiTextContainer: {
		marginTop: hp(10)
	},
	emojiText: {
		textAlign: 'center',
		color: '#2B2D42',
		fontSize: RFValue(20, stdHeight)
	},
	transparentEmojiText: {
		fontSize: RFValue(20, stdHeight),
		color: 'transparent'
	},
	emojiContainer: {
		flexDirection: 'row',
		alignSelf: 'stretch',
		justifyContent: 'space-around',
		elevation: 7,
		zIndex: 3
	},
	emojiSymbol: {
	},
	emojiStyle: {
		fontSize: RFValue(80, stdHeight)
	},
	confettiContainer: {
		elevation: 6,
    	zIndex: 2,
    	bottom: -RFValue(80, stdHeight),
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
        fontSize: RFValue(50, stdHeight),
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
    	width: RFValue(50, stdHeight)
    },
    takePictureContainer: {
    },
    takePicture: {
        fontSize: RFValue(100, stdHeight),
        color: 'white',
    },
    flipCameraContainer: {
    },
    flipCamera: {
        fontSize: RFValue(50, stdHeight),
        color: 'white',
    }
});
