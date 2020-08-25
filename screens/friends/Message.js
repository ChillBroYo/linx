import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    white,
} from '../../constants/Colors';
import { UserContext } from "../../contexts/UserContext";
import getApiEndpoint from '../../helpers/apiEndpoint';
import { useInterval, useIsMountedRef } from '../../helpers/hooks';

export default function Message({ navigation }) {
    const isMountedRef = useIsMountedRef();
    const flatListRef = useRef(null);
    const { token, userId } = useContext(UserContext);
    const [flatListScrollY, setFlatListScrollY] = useState(0);
    const [multiplier, setMultiplier] = useState(1);
    const [messages, setMessages] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const contact = navigation.getParam('contact');

    useEffect(() => {
        getMessages();
    }, []);

    useInterval(getMessages, 1000);

    if (!contact?.id) {
        doBack();
        return null;
    }

    function doBack() {
        navigation.goBack();
    }

    function doProfile() {
        navigation.navigate('FriendsProfile', { id: contact.id });
    }

    async function getMessages() {
        try {
            const API_ENDPOINT = getApiEndpoint(['get', 'conversation']);
            const queryParams = {
                uid: userId,
                oid: contact.id,
                token,
                limit: 50 * multiplier,
                ts: null,
            };
            const res = await axios(`${API_ENDPOINT}?${qs.stringify(queryParams)}`);
            const data = res?.data;
            if (isMountedRef.current && data?.messages) {
                await setMessages(data.messages);
            }
            scrollToBottom();
        }
        catch (error) {
            console.warn('Error in getMessages:', error);
        }
    }

    async function sendMessage() {
        const messageToSend = newMessage.trim();
        if (!messageToSend) return;

        try {
            const API_ENDPOINT = getApiEndpoint(['add', 'message']);
            const reqBody = {
                token,
                uid: userId,
                oid: contact.id,
                msg: messageToSend,
            };
            const params = new URLSearchParams();
            for (let key in reqBody) {
                params.append(key, reqBody[key]);
            }

            await axios.post(API_ENDPOINT, params);
            await setNewMessage('');
        }
        catch (error) {
            console.warn('Error in sendMessage:', error);
            Alert.alert('Failed to send message. Please try again.');
        }
    }

    async function loadMoreMessages() {
        setMultiplier(multiplier + 1);
    }

    function scrollToBottom() {
        if (flatListScrollY != 0) return;
        flatListRef.current.scrollToIndex({ index: 0 });
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={styles.container}
        >
            <LinearGradient colors={lightGradient} style={styles.container}>
                <View style={styles.banner}>
                    <SafeAreaView edges={['top']} style={styles.row}>
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

                        <View style={styles.sideWrapper} />
                    </SafeAreaView>
                </View>

                <FlatList
                    ref={flatListRef}
                    inverted
                    data={messages}
                    extraData={messages}
                    keyExtractor={item => item.message_id.toString()}
                    onEndReachedThreshold={0.8}
                    onEndReached={({ distanceFromEnd }) => {
                        loadMoreMessages();
                    }}
                    onScroll={(e) => {
                        setFlatListScrollY(e.nativeEvent.contentOffset.y);
                    }}
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
                            );
                        }
                        else {
                            return (
                                <View style={[styles.row, styles.otherMessageWrapper]}>
                                    {contact?.profile_picture ? (
                                        <Image
                                            source={{uri: contact?.profile_picture}}
                                            style={styles.contactIcon}
                                        />
                                    ) : (
                                        <View style={styles.contactIcon}>
                                            <Text style={styles.contactInitials}>
                                                {contact?.name?.first?.[0]}
                                                {contact?.name?.last?.[0]}
                                            </Text>
                                        </View>
                                    )}
                                    <View style={[styles.messageWrapper, styles.otherMessage]}>
                                        <Text style={styles.messageText}>{message}</Text>
                                    </View>
                                </View>
                            );
                        }
                    }}
                />

                <View style={styles.inputWrapper}>
                    <SafeAreaView edges={['bottom']} style={styles.row}>
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
        backgroundColor: white,
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#f0f0f0',
        borderColor: grey,
        borderRadius: 25,
        borderWidth: 2,
        marginRight: 10,
        height: 50,
        width: 50,
    },
    contactInitials: {
        color: black,
        fontSize: 20,
        textTransform: 'capitalize',
    },
    contactInfoText: {
        color: white,
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
        color: white,
        fontSize: 16,
    },
    messageTs: {
        color: grey,
        fontSize: 8,
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
        maxWidth: '90%',
    },
    otherMessage: {
        backgroundColor: '#2B2D42',
        borderTopLeftRadius: 0,
        flexShrink: 1,
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
        backgroundColor: white,
        flex: 1,
        maxHeight: 150,
    },
    inputWrapper: {
        backgroundColor: white,
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
