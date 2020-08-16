import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    Alert,
    Button,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
} from 'react-native';
import axios from 'axios';
import qs from 'query-string';
import { LinearGradient } from 'expo-linear-gradient';
import {
    black,
    grey,
    lightGradient,
    purple,
} from '../../constants/Colors';
import { UserContext } from '../../contexts/UserContext';
import getApiEndpoint from '../../helpers/apiEndpoint';
import { useInterval, useIsMountedRef } from '../../helpers/hooks';

export default function Messages({ navigation }) {
    const {
        friends,
        token,
        userId,
    } = useContext(UserContext);
    const [friendsList, setFriendsList] = useState(null);
    const [messagesCount, setMessagesCount] = useState(null);
    const [messages, setMessages] = useState(null);
    const isMountedRef = useIsMountedRef();

    useEffect(() => {
        getMessagesCount();
    }, []);

    useInterval(getMessagesCount, 5000);

    useEffect(() => {
        if (!friends.length) return;

        for (let id of friends) {
            getProfile(id);
        }
    }, [friends]);

    useEffect(() => {
        if (!messagesCount) return;

        for (let id in messagesCount) {
            getLastMessage(id);
        }
    }, [messagesCount]);

    async function getMessagesCount() {
        try {
            const API_ENDPOINT = getApiEndpoint(['get', 'conversation', 'list']);
            const queryParams = {
                uid: userId,
                token,
                limit: 1,
            };
            const res = await axios(`${API_ENDPOINT}?${qs.stringify(queryParams)}`);
            const data = res?.data;
            if (isMountedRef.current && data?.users) {
                await setMessagesCount(data.users);
            }
        }
        catch (error) {
            console.warn('error in getMessagesCount:', error);
        }
    }

    async function getLastMessage(oid) {
        try {
            const API_ENDPOINT = getApiEndpoint(['get', 'conversation']);
            const queryParams = {
                uid: userId,
                oid,
                token,
                limit: 1,
                ts: null,
            };
            const res = await axios(`${API_ENDPOINT}?${qs.stringify(queryParams)}`);
            const data = res?.data;
            if (isMountedRef.current && data?.messages?.[0]) {
                await setMessages({
                    ...(messages || {}),
                    [oid]: data.messages[0],
                });
            }
        }
        catch (error) {
            console.warn('error in getLastMessage:', error);
        }
    }

    async function getProfile(uid) {
        try {
            const API_ENDPOINT = getApiEndpoint(['get', 'profile']);
            const queryParams = {
                uid,
                key: 123,
            };
            const res = await axios(`${API_ENDPOINT}?${qs.stringify(queryParams)}`);
            const data = res?.data?.user_info;
            if (isMountedRef.current && data?.info) {
                const info = JSON.parse(data.info);
                const name = info.name;
                await setFriendsList({
                    ...(friendsList || {}),
                    [uid]: {
                        name,
                        profile_picture: data?.profile_picture,
                    },
                });
            }
        }
        catch (error) {
            console.warn('error in getProfile:', error);
        }
    }

    return (
        <LinearGradient colors={lightGradient} style={styles.container}>
            <SafeAreaView style={styles.headerWrapper}>
                <Text style={styles.header}>Messages</Text>
            </SafeAreaView>
            {!friends.length ? (
                <View style={styles.loadingWrapper}>
                    <Text>You have no messages right now</Text>
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.scrollable}>
                    {friends?.map((id, i) => {
                        const user = friendsList?.[id];

                        return (
                            <React.Fragment key={id}>
                                {i !== 0 && (
                                    <View style={styles.dividerWrapper}>
                                    <View style={styles.divider} />
                                    </View>
                                )}
                                <TouchableHighlight
                                    activeOpacity={1}
                                    underlayColor='none'
                                    onPress={() => navigation.navigate(
                                        'FriendsMessage',
                                        { contact: { ...user, id } }
                                    )}
                                    style={styles.userWrapper}
                                >
                                    <>
                                        <View style={styles.userIcon}>
                                            {user?.profile_picture ? (
                                                <Image
                                                    source={{uri: user?.profile_picture}}
                                                    style={styles.userIcon}
                                                />
                                            ) : (
                                                <Text style={styles.userInitials}>
                                                    {user?.name?.first?.[0]}
                                                    {user?.name?.last?.[0]}
                                                </Text>
                                            )}
                                        </View>
                                        <View style={styles.messageWrapper}>
                                            <Text
                                                numberOfLines={1}
                                                style={styles.userName}
                                            >
                                                {user?.name?.first} {user?.name?.last}
                                            </Text>
                                            <Text
                                                numberOfLines={1}
                                                style={styles.message}
                                            >
                                                {messages?.[id]?.message}
                                            </Text>
                                        </View>
                                    </>
                                </TouchableHighlight>
                            </React.Fragment>
                        )
                    })}
                </ScrollView>
            )}
        </LinearGradient>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    divider: {
        borderBottomColor: black,
        borderBottomWidth: 1,
        flex: 1,
    },
    dividerWrapper: {
        flexDirection: 'row',
        marginHorizontal: 37,
        marginVertical: 10,
    },
    header: {
        color: black,
        fontSize: 30,
    },
    headerWrapper: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 40,
    },
    loadingWrapper: {
        alignItems: 'center',
        marginTop: 30,
    },
    message: {
        fontSize: 20,
    },
    messageWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    scrollable: {
        flex: 1,
        alignItems: 'center',
    },
    userIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#f0f0f0',
        borderColor: grey,
        borderRadius: 30,
        borderWidth: 2,
        marginRight: 15,
        height: 60,
        width: 60,
    },
    userInitials: {
        color: black,
        fontSize: 25,
        textTransform: 'capitalize',
    },
    userName: {
        fontSize: 24,
    },
    userWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 37,
        paddingVertical: 6,
        width: '100%',
    },

});

