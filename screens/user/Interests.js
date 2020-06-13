import React, { useContext } from 'react';
import {
    Alert,
    FlatList,
    Keyboard,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import {
    formStyles,
    PageHeader,
    pageStyles,
    ProgressBar,
    TOTAL_STEPS,
    TopBar,
} from './common';
import BackArrow from '../../components/BackArrow';
import BarButton from '../../components/BarButton';
import PillButton from '../../components/PillButton';
import { grey, lightGradient, purple } from '../../constants/Colors';
import { SignUpContext } from '../../contexts/SignUpContext';

export default function UserGender({ navigation }) {
    const {
        selectedInterests, setSelectedInterests,
        sameInterests, setSameInterests,
        formatUserInfo,
    } = useContext(SignUpContext);
    const interests = ['art', 'food', 'nature', 'sports'];

    function doBack() {
        navigation.goBack();
    }

    async function doSubmit() {
        try {
            const API_BASE = 'http://192.168.1.15:8080/sign_up';
            const user = formatUserInfo();
            const res = await axios.get(API_BASE, { params: user });
            const data = res.data;
            if (res.status != 200) {
                Alert.alert('Sign up failed. Please try again');
                return;
            }
            if (!data.success || data.success == 'false') {
                Alert.alert(data.errmsg);
                return;
            }

            navigation.navigate('SignIn');
        } catch (error) {
            Alert.alert('Sign up failed. Please try again');
        }
    }

    // FlatList renderItem passes { index: <i>, item: <data[i]> }
    function renderInterest({ item: interest }) {
        return (
            <View style={styles.buttonWrapper}>
                <PillButton
                    selected={selectedInterests.has(interest)}
                    value={interest}
                    text={interest}
                    doPress={() => toggleInterest(interest)}
                />
            </View>
        );
    }

    function toggleInterest(interest) {
        let nextInterests = new Set([...selectedInterests]);
        selectedInterests.has(interest) ? nextInterests.delete(interest) : nextInterests.add(interest);
        setSelectedInterests(nextInterests);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={pageStyles.container}>
                <TopBar />
                <LinearGradient colors={lightGradient} style={pageStyles.container}>
                    <ProgressBar step={6} totalSteps={TOTAL_STEPS} />
                    <BackArrow doPress={doBack} />
                    <ScrollView style={pageStyles.container}>
                        <PageHeader value='I like' />
                        <View style={styles.form}>
                            <FlatList
                                data={interests}
                                extraData={selectedInterests}
                                keyExtractor={interest => interest}
                                horizontal={false}
                                numColumns={2}
                                renderItem={renderInterest}
                            />
                            <View style={styles.textWrapper}>
                                <Text style={formStyles.text}>
                                    Connect only with people that like the same things as me
                                </Text>
                            </View>
                            <Switch
                                value={sameInterests}
                                onValueChange={sameInterests => setSameInterests(sameInterests)}
                                trackColor={{ false: grey, true: purple }}
                                style={styles.toggle}
                            />
                        </View>
                    </ScrollView>
                </LinearGradient>
                <BarButton value='Done' doPress={doSubmit} />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    buttonWrapper: {
        marginBottom: 23,
        marginTop: 0,
        marginHorizontal: 11,
        height: 42,
        width: 140,
    },
    form: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginVertical: 0,
    },
    textWrapper: {
        marginHorizontal: 40,
    },
    toggle: {
        marginTop: 16,
    },
});
