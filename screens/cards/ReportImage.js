import React, { useState } from 'react';
import {
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SafeAreaView from 'react-native-safe-area-view';
import { lightGradient } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import BarButton from '../../components/BarButton';
import moment from 'moment';
import { canOpenURL, openURL } from 'expo-linking';
import { useUserContext } from '../../contexts/UserContext';
import { wp, hp } from '../../styles/helpers';

export default function ReportImageScreen({ navigation }) {
	const {
		state: userState,
		doUpdateImageIndex,
		formatUserForIndex,
	} = useUserContext();
	const { userId, username } = userState;
	const imageId = navigation.getParam('imageId');
	const imageIndex = navigation.getParam('imageIndex');

	const [issue, setIssue] = useState('');

	async function doReport() {
		if (!issue) return;

		const user = getUserForReport();
		const didUpdateIndex = await doUpdateImageIndex(user);
        if(!didUpdateIndex) return;

		doReportImageEmail();
		navigation.state.params.onGoBack();
		navigation.goBack();
	}

	function getUserForReport() {
		const user = formatUserForIndex(imageIndex + 1);
        reactionTime = moment.utc().format('YYYY-MM-DDTHH:mm:ss');
        user.info.lastReaction = reactionTime;
        return user;
	}

	async function doReportImageEmail() {
		try {
            const subject = 'Linx: Report Image';
            const body = `User Name: ${username}\nUser ID: ${userId}\nImage ID: ${imageId}\nIssue: ${issue}`;
            const URL = `mailto:webmaster@linx-services.com?subject=${subject}&body=${body}`;
            const canOpenUrl = await canOpenURL(URL);
            if (!canOpenUrl) return;
            await openURL(URL);
        }
        catch (error) {
            console.warn('Error in doReportImageEmail:', error);
        }
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<LinearGradient colors={lightGradient} style={styles.container}>
					<SafeAreaView style={styles.container}>
						<View style={styles.titleContainer}>
							<View style={styles.noIcon} />
							<Text style={styles.titleText}>Report issue</Text>
							<Ionicons name='md-close' size={40} color='#1B1B1B' onPress={() => navigation.navigate('UserStatus')} />
						</View>
						<View style={styles.subtitleContainer}>
							<Text style={styles.subtitleText}>How can we help you?</Text>
						</View>
						<View style={styles.issueContainer}>
							<TextInput
								name='issue'
								placeholder='Issues...'
								value={issue}
								onChangeText={issue => setIssue(issue)}
								clearButtonMode='while-editing'
								multiline={true}
								returnKeyType='done'
								blurOnSubmit={true}
								onSubmitEditing={()=>{Keyboard.dismiss()}}
								style={styles.issueText}
							/>
						</View>
					</SafeAreaView>
				</LinearGradient>
				<BarButton
                    active={!!issue}
                    value='Submit'
                    doPress={doReport}
                />
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	titleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		marginTop: hp(20)
	},
	noIcon: {
		width: 40
	},
	titleText: {
		fontSize: 25,
		color: '#1B1B1B',
		fontWeight: 'bold'
	},
	subtitleContainer: {
		marginVertical: hp(30),
		alignItems: 'center'
	},
	subtitleText: {
		fontSize: 25,
		color: '#1B1B1B'
	},
	issueContainer: {
		alignItems: 'center',
	},
	issueText: {
		fontSize: 25,
		width: wp(300),
		height: hp(330),
		backgroundColor: '#FFF',
		borderColor: '#8D99AE',
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: wp(20)
	}
});
