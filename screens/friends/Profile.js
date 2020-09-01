import React, { useContext, useEffect, useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import qs from 'query-string';
import moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import BackArrow from '../../components/BackArrow';
import BarButton from '../../components/BarButton';
import Loader from '../../components/Loader';
import {
    black,
    green,
    grey,
    lightGradient,
    purple,
    white,
} from '../../constants/Colors';
import { UserContext } from '../../contexts/UserContext';
import getApiEndpoint from '../../helpers/apiEndpoint';
import { useInterval, useIsMountedRef } from '../../helpers/hooks';

export default function Profile({ navigation }) {
    const insets = useSafeAreaInsets();
    const isMountedRef = useIsMountedRef();
    const {
        token,
        userId,
    } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const [friend, setFriend] = useState(null);
    const [genderIdentifier, setGenderIdentifier] = useState('');
    const [commonImages, setCommonImages] = useState(null);
    const friendId = navigation.getParam('id');

    useEffect(() => {
        getProfile(friendId);
    }, []);

    useEffect(() => {
        getCommonImages(friendId);
    }, [friend]);

    if (!friendId) {
        doBack();
        return null;
    }

    function doBack() {
        navigation.goBack();
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
            if (isMountedRef.current && data) {
                const friend = {
                    ...data,
                    friends: JSON.parse(data.friends),
                    info: JSON.parse(data.info),
                };
                await setFriend(friend);
                await setGenderIdentifier(getGenderIdentifier());
                await setIsLoading(false);
            }
        }
        catch (error) {
            console.warn('error in getProfile:', error);
        }
    }

    async function getCommonImages(oid) {
        try {
            const API_ENDPOINT = getApiEndpoint(['common', 'images', 'between', 'users']);
            const queryParams = {
                token,
                user_id: userId,
                oid,
            };
            const res = await axios(`${API_ENDPOINT}?${qs.stringify(queryParams)}`);
            const data = res?.data;
            if (isMountedRef.current && data) {
                await setCommonImages(data.images_urls);
            }
        }
        catch (error) {
            console.warn('error in getCommonImages:', error);
        }
    }

    function getAge() {
        return moment(friend?.info?.birthday).fromNow(true);
    }

    function getInitials() {
        const name = friend?.info?.name;
        if (!name) return;
        return name?.first[0] + name?.last[0];
    }

    function getLocation() {
        const location = friend?.info?.location;
        if (!location) return;
        return `${location.city}, ${location.state}`;
    }

    function getGenderIdentifier() {
        const gender = friend?.info?.gender;
        if (gender === 'male') {
            return 'He';
        }
        else if (gender === 'female') {
            return 'She';
        }
        else {
            return 'They';
        }
    }

    function confirmRemoveFriend() {
        Alert.alert(
            'Remove friend?',
            'This cannot be undone.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Confirm',
                    onPress: doRemoveFriend,
                }
            ],
        );
    }

    function doRemoveFriend() {
        console.log('removing friend');
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={lightGradient} style={styles.container}>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.header}>
                        <View style={[styles.profileImage, { marginTop: insets.top + 30 }]}>
                            {friend?.profile_picture
                                ? <Image source={{ uri: friend.profile_picture }} style={styles.image} />
                                : <Text style={styles.profileInitials}>{getInitials()}</Text>
                            }
                        </View>
                        {friend?.info?.name && (
                            <Text style={styles.name}>
                                {friend.info.name.first} {friend.info.name.last}
                            </Text>
                        )}
                    </View>

                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={styles.sectionHeader}>
                                {genderIdentifier} live{genderIdentifier !== 'They' && 's'} in
                            </Text>
                            <Text style={styles.sectionText}>{getLocation()}</Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={styles.sectionHeader}>
                                {genderIdentifier} {genderIdentifier !== 'They' ? 'is' : 'are'}
                            </Text>
                            <Text style={styles.sectionText}>
                                {getAge()} old {friend?.info?.gender}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={styles.sectionHeader}>
                                You both liked
                            </Text>
                            <ScrollView horizontal contentContainerStyle={{ marginVertical: 10 }}>
                                {commonImages == null ? null
                                    : commonImages.map((url, index) => {
                                        return(<Image source={{ uri: url }} style={styles.imageWrapper} />)
                                    })
                                }
                            </ScrollView>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.removeFriendWrapper}>
                    <TouchableOpacity onPress={confirmRemoveFriend}>
                        <Text style={styles.removeFriend}>Remove friend</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <BarButton
                active={true}
                value='Chat'
                doPress={doBack}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    divider: {
        borderBottomColor: grey,
        borderBottomWidth: 1,
        height: 1,
        marginHorizontal: 37,
        marginVertical: 20,
    },

    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    name: {
        color: purple,
        fontSize: 30,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 60,
        overflow: 'hidden',
    },
    profileImage: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: purple,
        borderRadius: 60,
        height: 80,
        width: 80,
        marginBottom: 8,
    },
    profileInitials: {
        color: white,
        fontSize: 38,
        lineHeight: 50,
        textTransform: 'uppercase',
    },

    column: {
        flex: 1,
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 37,
    },
    sectionHeader: {
        color: purple,
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 22,
        marginBottom: 5,
    },
    sectionText: {
        fontSize: 20,
    },

    removeFriendWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    removeFriend: {
        color: grey,
        fontSize: 20,
        fontStyle: 'italic',
        lineHeight: 27,
        marginVertical: 20,
        textAlign: 'center',
    },

    imageWrapper: {
        height: 190,
        width: 190,
        marginBottom: 8,
        marginRight: 8,

        /*
        At the moment, all images appear in uniform size. As a result, some images may be cut off due to the size restraints placed.
        If we wish to update so that all images appear in their entirety, the below line can be commented out. When commended out,
        this will have images resize within the container as needed so that the entire image shows.
        */
        //resizeMode: 'contain'
    },
});
