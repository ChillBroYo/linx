import React, { useContext, useEffect, useState } from 'react';
import {
    Alert,
    Button,
    Dimensions,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import InView from "react-native-component-inview";
import axios from 'axios';
import moment from 'moment';
import qs from 'query-string';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import BackArrow from '../../components/BackArrow';
import {
    black,
    green,
    grey,
    lightGradient,
    purple,
} from '../../constants/Colors';
import { UserContext } from "../../contexts/UserContext";
import { getEnvVars } from '../../environment';

const { apiUrl } = getEnvVars();
const platform = Platform.OS;

export default function Message({ navigation }) {
    const { token, userId } = useContext(UserContext);
    const [messages, setMessages] = useState(null);
    const [newMessage, setNewMessage] = useState('');

    const contact = navigation.getParam('contact');

    useEffect(() => {
        let mounted = true;

        getMessages();

        const intervalId = setInterval(() => {
            if (mounted) {
                getMessages();
            }
        }, 2000);

        return () => {
            mounted = false;
            clearInterval(intervalId);
        }
    }, []);

    if (!contact?.id) {
        doBack();
        return null;
    }

    function doBack() {
        navigation.goBack();
    }

    function doProfile() {
        navigation.navigate( 'FriendsProfile', { id: contact.id });
    }

    async function getMessages() {
        try {
            const API_ENDPOINT = `${apiUrl}/${['get', 'conversation'].join(__DEV__ ? '_' : '-')}`;
            const queryParams = {
                uid: userId,
                oid: contact.id,
                token,
                limit: 1000,
                ts: null,
            };
            const res = await axios(`${API_ENDPOINT}?${qs.stringify(queryParams)}`);
            const data = res?.data;
            if (data?.messages) {
                await setMessages(data.messages);
            }
        }
        catch (error) {
            console.warn('Error in getMessages:', error);
        }
    }

    async function sendMessage() {
        if (!newMessage) return;

        try {
            const API_ENDPOINT = `${apiUrl}/${['add', 'message'].join(__DEV__ ? '_' : '-')}/`;
            const reqBody = {
                token,
                uid: userId,
                oid: contact.id,
                msg: newMessage,
            };
            const params = new URLSearchParams();
            for (let key in reqBody) {
                params.append(key, reqBody[key]);
            }

            const res = await axios.post(API_ENDPOINT, params);
        }
        catch (error) {
            console.warn('Error in sendMessage:', error);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={styles.container}
        >
            <LinearGradient colors={lightGradient} style={styles.container}>
                <View style={styles.banner}>
                    <SafeAreaView style={styles.row}>
                        <View style={styles.sideWrapper}>
                            <BackArrow doPress={doBack} />
                        </View>

                        <View style={styles.centerWrapper}>
                            <TouchableOpacity
                                onPress={doProfile}
                                style={styles.contactWrapper}
                            >
                                <Text style={styles.contactName}>
                                    {contact?.name?.first} {contact?.name?.last?.[0]}.
                                </Text>
                                <View style={styles.contactInfoWrapper}>
                                    <Text style={styles.contactInfoText}>i</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.sideWrapper}>
                        </View>
                    </SafeAreaView>
                </View>

                <FlatList
                    data={messages}
                    inverted={true}
                    keyExtractor={item => item.message_id.toString()}
                    renderItem={({ item }) => {
                        const {
                            message,
                            other_id: oid,
                            user_id: uid,
                            created_ad: ts,
                        } = item;

                        if (uid == userId) {
                            return (
                                <View style={[styles.messageWrapper, styles.ownMessage]}>
                                    <Text style={styles.messageText}>{message}</Text>
                                </View>
                            )
                        }
                        else {
                            return (
                                <View style={[styles.row, styles.otherMessageWrapper]}>
                                    <Image
                                        source={{uri: contact?.profile_picture}}
                                        style={styles.contactIcon}
                                    />
                                    <View style={[styles.messageWrapper, styles.otherMessage]}>
                                        <Text style={styles.messageText}>{message}</Text>
                                    </View>
                                </View>
                            )
                        }
                    }}
                />

                <View style={styles.inputWrapper}>
                    <SafeAreaView style={styles.row}>
                        <TextInput
                            multiline
                            placeholder='Type your message'
                            value={newMessage}
                            onChangeText={text => setNewMessage(text)}
                            style={styles.input}
                        />

                        <TouchableOpacity
                            onPress={sendMessage}
                            style={styles.sendIcon}
                        >
                            <Ionicons name='md-send' color={black} size={30} />
                        </TouchableOpacity>
                    </SafeAreaView>
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    banner: {
        backgroundColor: 'white',
        paddingVertical: 6,
        shadowColor: grey,
        shadowOpacity: 0.5,
        shadowRadius: 10,
        zIndex: 1000,
    },
    contactWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 12,
    },
    contactIcon: {
        backgroundColor:'#f0f0f0',
        borderColor: grey,
        borderRadius: 25,
        borderWidth: 2,
        marginRight: 10,
        height: 50,
        width: 50,
    },
    contactInfoText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
    },
    contactInfoWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: purple,
        borderRadius: 15,
        marginLeft: 8,
        height: 30,
        width: 30,
    },
    contactName: {
        color: purple,
        fontSize: 30,
    },
    centerWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2,
    },
    sideWrapper: {
        flex: 1,
    },

    messageText: {
        color: 'white',
        fontSize: 20,
    },
    messageWrapper: {
        borderRadius: 20,
        justifyContent: 'center',
        minHeight: 50,
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    otherMessageWrapper: {
        alignItems: 'flex-start',
        marginLeft: 7,
        marginVertical: 7,
    },
    otherMessage: {
        backgroundColor: '#2B2D42',
        borderTopLeftRadius: 0,
        maxWidth: '77%',
    },
    ownMessage: {
        alignSelf: 'flex-end',
        backgroundColor: green,
        borderTopRightRadius: 0,
        marginRight: 7,
        marginVertical: 7,
        maxWidth: '90%',
    },

    input: {
        backgroundColor: 'white',
        flex: 1,
        maxHeight: 150,
    },
    inputWrapper: {
        backgroundColor: 'white',
        padding: 7,
        shadowColor: grey,
        shadowOpacity: 0.5,
        shadowRadius: 7,
    },
    sendIcon: {
        alignSelf: 'flex-end',
    },

    row: {
        flexDirection: 'row',
    },
});
