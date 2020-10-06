import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import qs from 'query-string';
import { LinearGradient } from 'expo-linear-gradient';
import {
    black,
    grey,
    lightGradient,
    purple,
} from '../../constants/Colors';
import Loader from '../../components/Loader';
import { UserContext } from '../../contexts/UserContext';
import getApiEndpoint from '../../helpers/apiEndpoint';
import { useInterval, useIsMountedRef } from '../../helpers/hooks';

export default function Messages({ navigation }) {
    const insets = useSafeAreaInsets();
    const {
        token,
        userId,
    } = useContext(UserContext);
    const isMountedRef = useIsMountedRef();
    const [loading, setLoading] = useState(true);
    const [friends, setFriends] = useState(null);

    useEffect(() => {
        (async () => {
            await getData();
            await setLoading(false);
        })();
    }, []);

    useInterval(getData, 5000);

    async function getData() {
        const friendsList = [];
        const userFriends = await getFriends();
        if (!userFriends) return;

        for (let id of userFriends) {
            const friend = {};
            const friendData = await getProfile(id);
            const friendInfo = JSON.parse(friendData.info);
            const lastMessage = await getLastMessage(id);

            friend.id = id;
            friend.name = friendInfo.name;
            friend.profile_picture = friendData.profile_picture;
            friend.lastMessage = lastMessage;

            friendsList.push(friend);
        }

        if (isMountedRef.current) {
            await setFriends(friendsList);
        }
    }

    async function getFriends() {
        if (!userId) return;

        const user = await getProfile(userId);
        const userFriends = JSON.parse(user.friends);
        return userFriends;
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
            return data?.messages?.[0];
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
            return data;
        }
        catch (error) {
            console.warn('error in getProfile:', error);
        }
    }

    return (
        <LinearGradient colors={lightGradient} style={styles.container}>
            <View style={[styles.headerWrapper, {marginTop: insets.top || 40}]}>
                <Text style={styles.header}>New friends</Text>
            </View>
            <Loader visible={loading} />
            {loading === false && !friends?.length ? (
                <View style={styles.loadingWrapper}>
                    <Text style={styles.noFriendsText}>You haven't been linked with anyone yet. Don't worry though, we are working on it.</Text>
                    <Image source={require('../../assets/images/no_friends_cup.png')} style={styles.noFriendsImage} />
                </View>
            ) : (
                <FlatList
                    data={friends}
                    extraData={friends}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item: friend }) => (
                        <TouchableHighlight
                            activeOpacity={1}
                            underlayColor='none'
                            onPress={() => navigation.navigate('FriendsMessage', {
                                contact: {
                                    id: friend.id,
                                    name: friend.name,
                                    profile_picture: friend.profile_picture
                                }
                            })}
                            style={styles.userWrapper}
                        >
                            <>
                                {friend?.profile_picture ? (
                                    <Image
                                        source={{ uri: friend.profile_picture }}
                                        style={styles.userIcon}
                                    />
                                ) : (
                                    <View style={styles.userIcon}>
                                        <Text style={styles.userInitials}>
                                            {friend?.name?.first?.[0]}
                                            {friend?.name?.last?.[0]}
                                        </Text>
                                    </View>
                                )}
                                <View style={styles.messageWrapper}>
                                    <Text
                                        numberOfLines={1}
                                        style={styles.userName}
                                    >
                                        {friend?.name?.first} {friend?.name?.last}
                                    </Text>
                                    <Text
                                        numberOfLines={1}
                                        style={styles.message}
                                    >
                                        {friend?.lastMessage?.message}
                                    </Text>
                                </View>
                            </>
                        </TouchableHighlight>
                    )}
                    ItemSeparatorComponent={() => (
                        <View style={styles.dividerWrapper}>
                            <View style={styles.divider} />
                        </View>
                    )}
                    contentContainerStyle={{alignItems: 'center'}}
                />
            )}
        </LinearGradient>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    divider: {
        borderBottomColor: grey,
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
    },
    loadingWrapper: {
        alignItems: 'center',
        marginTop: 40,
    },
    message: {
        fontSize: 16,
    },
    messageWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    noFriendsImage: {
        marginTop: 50
    },
    noFriendsText: {
        fontSize: 20,
        color: black,
        marginHorizontal: 55,
        textAlign: 'center'
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
        fontSize: 22,
        marginBottom: 4,
    },
    userWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 37,
        paddingVertical: 6,
        width: '100%',
    },

});

