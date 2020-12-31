import React, { createContext, useContext, useReducer, useState } from 'react';
import { Alert } from 'react-native';
import { Notifications } from 'expo';
import axios from 'axios';
import moment from 'moment';
import getApiEndpoint from '../helpers/apiEndpoint';

// default config for axios requests
const DEFAULT_CONFIG = {
    validateStatus: function (status) {
        return (status >= 200 && status < 300) || status == 400;
    },
};

export const UserTypes = {
    SET_EXPO_PUSH_TOKEN: 'SET_EXPO_PUSH_TOKEN',
    SET_USER_ID: 'SET_USER_ID',
    SET_TOKEN: 'SET_TOKEN',
    SET_IS_ONBOARDED: 'SET_IS_ONBOARDED',
    SET_GOOGLE_ACCOUNT: 'SET_GOOGLE_ACCOUNT',
    SET_LAST_REACTION: 'SET_LAST_REACTION',
    SET_EMAIL: 'SET_EMAIL',
    SET_PASSWORD: 'SET_PASSWORD',
    SET_USERNAME: 'SET_USERNAME',
    SET_PROFILE_IMG: 'SET_PROFILE_IMG',
    SET_FIRST_NAME: 'SET_FIRST_NAME',
    SET_LAST_NAME: 'SET_LAST_NAME',
    SET_CITY: 'SET_CITY',
    SET_STATE: 'SET_STATE',
    SET_ZIP: 'SET_ZIP',
    SET_DISTANCE: 'SET_DISTANCE',
    SET_AGE_RANGE: 'SET_AGE_RANGE',
    SET_BIRTHDAY: 'SET_BIRTHDAY',
    SET_GENDER: 'SET_GENDER',
    SET_SAME_GENDER: 'SET_SAME_GENDER',
    SET_IMAGES_VISITED: 'SET_IMAGES_VISITED',
    SET_FRIENDS: 'SET_FRIENDS',
    SET_USER_FIELDS: 'SET_USER_FIELDS',
    RESET_STATE: 'RESET_STATE',
};

const initialState = {
    expoPushToken: '',
    userId: '',
    token: '',
    isOnboarded: false,
    googleAccount: false,
    lastReaction: moment.utc().format('YYYY-MM-DDTHH:mm:ss'),
    email: '',
    password: '',
    username: '',
    profileImg: '',
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    zip: '',
    distance: 25,
    ageRange: [23, 29],
    birthday: '',
    gender: '',
    sameGender: false,
    imagesVisited: [],
    friends: [],
};

function userReducer(state, action) {
    const { payload } = action;
    switch (action.type) {
        case UserTypes.SET_EXPO_PUSH_TOKEN:
            return {
                ...state,
                expoPushToken: payload.expoPushToken,
            }
        case UserTypes.SET_USER_ID:
            return {
                ...state,
                userId: payload.userId,
            }
        case UserTypes.SET_TOKEN:
            return {
                ...state,
                token: payload.token,
            }
        case UserTypes.SET_IS_ONBOARDED:
            return {
                ...state,
                isOnboarded: payload.isOnboarded,
            }
        case UserTypes.SET_GOOGLE_ACCOUNT:
            return {
                ...state,
                googleAccount: payload.googleAccount,
            }
        case UserTypes.SET_LAST_REACTION:
            return {
                ...state,
                lastReaction: payload.lastReaction,
            }
        case UserTypes.SET_EMAIL:
            return {
                ...state,
                email: payload.email,
            }
        case UserTypes.SET_PASSWORD:
            return {
                ...state,
                password: payload.password,
            }
        case UserTypes.SET_USERNAME:
            return {
                ...state,
                username: payload.username,
            }
        case UserTypes.SET_PROFILE_IMG:
            return {
                ...state,
                profileImg: payload.profileImg,
            }
        case UserTypes.SET_FIRST_NAME:
            return {
                ...state,
                firstName: payload.firstName,
            }
        case UserTypes.SET_LAST_NAME:
            return {
                ...state,
                lastName: payload.lastName,
            }
        case UserTypes.SET_CITY:
            return {
                ...state,
                city: payload.city,
            }
        case UserTypes.SET_STATE:
            return {
                ...state,
                state: payload.state,
            }
        case UserTypes.SET_ZIP:
            return {
                ...state,
                zip: payload.zip,
            }
        case UserTypes.SET_DISTANCE:
            return {
                ...state,
                distance: payload.distance,
            }
        case UserTypes.SET_AGE_RANGE:
            return {
                ...state,
                ageRange: payload.ageRange,
            }
        case UserTypes.SET_BIRTHDAY:
            return {
                ...state,
                birthday: payload.birthday,
            }
        case UserTypes.SET_GENDER:
            return {
                ...state,
                gender: payload.gender,
            }
        case UserTypes.SET_SAME_GENDER:
            return {
                ...state,
                sameGender: payload.sameGender,
            }
        case UserTypes.SET_IMAGES_VISITED:
            return {
                ...state,
                imagesVisited: payload.imagesVisited,
            }
        case UserTypes.SET_FRIENDS:
            return {
                ...state,
                friends: payload.friends,
            }
        case UserTypes.SET_USER_FIELDS:
            return {
                ...state,
                ...payload,
            }
        default:
            return {
                ...initialState,
            }
    }
}

export const UserContext = createContext({
    state: initialState,
    dispatch: () => null,
})

export function UserProvider({ children }) {
    const [state, dispatch] = useReducer(userReducer, initialState);

    const {
        expoPushToken,
        userId,
        token,
        isOnboarded,
        googleAccount,
        lastReaction,
        email,
        password,
        username,
        profileImg,
        firstName,
        lastName,
        city,
        state: stateUS,
        zip,
        distance,
        ageRange,
        birthday,
        gender,
        sameGender,
        imagesVisited,
        friends,
    } = state;

    const value = {
        state,
        dispatch,
        doLogoutUser,
        doSignInUser,
        doSignUpUser,
        doUpdateUser,
        doCompleteOnboardingUser,
        doGetImage,
        doGetUserProfile,
        doReactImage,
        doUpdateImageIndex,
        doUploadProfileUser,
        doValidateZip,
        formatFormData,
        formatParams,
        formatUserForImageUpload,
        formatUserForIndex,
        formatUserForLogout,
        formatUserForOnboarding,
        formatUserForReaction,
        formatUserForRequest,
        formatUserInfo,
        setUserFromProfileResponse,
        setUserFromResponse,
        resetState,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );

    function doLogoutUser() {
        const user = formatUserForLogout();
        doUpdateUser(user, null, true);
    }

    async function doSignInUser(user) {
        try {
            const API_ENDPOINT = getApiEndpoint(['sign', 'in']);
            const res = await axios.get(API_ENDPOINT, { params: user });
            const data = res.data;
            if (res.status != 200) {
                return false;
            }
            if (!data.success || data.success == 'false') {
                return false;
            }

            setUserFromResponse(data);
            return true;
        }
        catch (error) {
            return false;
        }
    }

    async function doSignUpUser(user) {
        try {
            const API_ENDPOINT = getApiEndpoint(['sign', 'up']);
            const params = formatParams(user);
            const res = await axios.post(API_ENDPOINT, params, DEFAULT_CONFIG);
            const data = res.data;
            if (res.status != 200 || !data.success || data.success == 'false') {
                return Alert.alert(data?.errmsg || 'Sign up failed. Please try again.');
            }

            dispatch({
                type: UserTypes.SET_USER_FIELDS,
                payload: {
                    token: data.token,
                    userId: data.uid,
                }
            });

            return true;
        }
        catch (error) {
            console.warn('Sign up error:', error);
            Alert.alert('Sign up failed. Please try again');
        }
    }

    async function doUpdateUser(user, callback, silent = false) {
        try {
            const API_ENDPOINT = getApiEndpoint(['update', 'profile']);
            const params = formatParams(user);
            const res = await axios.post(API_ENDPOINT, params, DEFAULT_CONFIG);
            const data = res.data;
            if (res.status != 200 || !data.success || data.success == 'false') {
                return Alert.alert(data?.errmsg || 'Update failed. Please try again.');
            }

            if (callback) {
                await callback();
            }

            if (!silent) {
                Alert.alert('Your settings have been updated');
            }
        }
        catch (error) {
            console.warn('Update failed:', error);
            Alert.alert('Update failed. Please try again.');
        }
    }

    async function doCompleteOnboardingUser(user) {
        try {
            const API_ENDPOINT = getApiEndpoint(['update', 'profile']);
            const params = formatParams(user);
            const res = await axios.post(API_ENDPOINT, params, DEFAULT_CONFIG);
            const data = res.data;
            if (res.status != 200 || !data.success || data.success == 'false') {
                return Alert.alert(data?.errmsg || 'Onboarding completion failed. Please try again.');
            }

            return true;
        }
        catch (error) {
            console.warn('Onboarding completion error:', error);
            Alert.alert('Onboarding completion failed. Please try again');
        }
    }

    async function doGetImage(image) {
        try {
            const API_ENDPOINT = getApiEndpoint(['get', 'image']);
            const res = await axios.get(API_ENDPOINT, { params: image });
            const data = res.data;
            if (res.status != 200) {
                return false;
            }
            if (data.success == 'false') {
                return false;
            }

            return {
                imageId: data.image_id,
                imageCategory: data.image_category,
                imageLink: data.link,
                imageMessage: data.message
            };
        }
        catch (error) {
            return false;
        }
    }

    async function doGetUserProfile(user) {
        try {
            const API_ENDPOINT = getApiEndpoint(['get', 'profile']);
            const res = await axios.get(API_ENDPOINT, { params: user });
            const data = res.data;
            if (res.status != 200) {
                return Alert.alert('Get user profile failed. Please try again');
            }
            if (!data.success || data.success == 'false') {
                return Alert.alert(data.errmsg);
            }

            setUserFromProfileResponse(data);
            return { imageIndex: data.user_info.image_index };
        }
        catch (error) {
            console.warn('Get user profile error:', error);
            Alert.alert('Get user profile failed. Please try again');
        }
    }

    async function doReactImage(user) {
        try {
            const API_ENDPOINT = getApiEndpoint(['react', 'to', 'image']);
            const params = formatParams(user);
            const res = await axios.post(API_ENDPOINT, params);
            const data = res.data;
            if (res.status != 200) {
                return Alert.alert('Reaction failed. Please try again');
            }
            if (!data.success || data.success == 'false') {
                return Alert.alert(data.errmsg);
            }

            return true;
        }
        catch (error) {
            console.warn('Reaction error:', error);
            Alert.alert('Reaction failed. Please try again');
        }
    }

    async function doUpdateImageIndex(user) {
        try {
            const API_ENDPOINT = getApiEndpoint(['update', 'profile']);
            const params = formatParams(user);
            const res = await axios.post(API_ENDPOINT, params);
            const data = res.data;
            if (res.status != 200) {
                return Alert.alert('Update card profile failed. Please try again');
            }
            if (!data.success || data.success == 'false') {
                return Alert.alert(data.errmsg);
            }

            return true;
        }
        catch (error) {
            console.warn('Update card profile error:', error);
            Alert.alert('Update card profile failed. Please try again');
        }
    }

    async function doUploadProfileUser(user) {
        try {
            const API_ENDPOINT = getApiEndpoint(['save', 'image']);
            const formData = formatFormData(user);
            const config = {
                ...DEFAULT_CONFIG,
                headers: {
                    'Content-Type': 'multipart/form-data; boundary=frontier'
                }
            };
            const res = await axios.post(API_ENDPOINT, formData, config);
            const data = res.data;
            if (res.status != 200 || !data.success || data.success == 'false') {
                return Alert.alert(data?.errmsg || 'Profile upload failed. Please try again.');
            }
            dispatch({
                type: UserTypes.SET_PROFILE_IMG,
                payload: { profileImg: data.image_url },
            });
            return true;
        }
        catch (error) {
            console.warn('Profile upload error:', error);
            Alert.alert('Profile upload failed. Please try again');
        }
    }

    async function doValidateZip(zip) {
        try {
            const API_ENDPOINT = getApiEndpoint(['is', 'valid', 'linx', 'zip']);
            const res = await axios.get(API_ENDPOINT, { params: zip });
            const data = res.data;
            if (res.status != 200) {
                return Alert.alert('Validate zip code failed. Please try again');
            }
            if (!data.success || data.success == 'false') {
                return Alert.alert(data.errmsg);
            }

            return Boolean(data.is_valid);
        }
        catch (error) {
            console.warn('Validate zip code error:', error);
            Alert.alert('Validate zip code failed. Please try again');
        }
    }

    function formatFormData(user) {
        const formData = new FormData();
        for (let key in user) {
            formData.append(key, user[key])
        }

        return formData;
    }

    function formatParams(user) {
        const params = new URLSearchParams();
        for (let key in user) {
            params.append(key, typeof user[key] == 'object' ? JSON.stringify(user[key]) : user[key]);
        }

        return params;
    }

    function formatUserForImageUpload() {
        const name = 'profile_' + String(userId) + '_' + String(moment.utc().format('YYYY-MM-DDTHH:mm:ss')) + '.jpg';
        const type = 'image/jpeg';

        return {
            image: {
                name: name,
                type: type,
                uri: profileImg,
            },
            user_id: userId,
            token,
            image_type: 'profile',
            image_category: 6,
        };
    }

    function formatUserForIndex(index) {
        return {
            user_id: userId,
            token,
            image_index: index,
            info: formatUserInfo(),
        };
    }

    function formatUserForLogout() {
        return {
            user_id: userId,
            token,
            info: formatUserInfo(true),
        };
    }

    function formatUserForOnboarding() {
        return {
            user_id: userId,
            token,
            info: formatUserInfo(),
        };
    }

    function formatUserForReaction(reactionType, imageId) {
        return {
            uid: userId,
            token,
            image_id: imageId,
            reaction_type: reactionType,
        };
    }

    function formatUserForRequest(isUpdate = false) {
        let user = {
            email: email.trim(),
            password,
            username: username.trim(),
            profile_picture: profileImg,
            security_level: 'user',
            info: formatUserInfo(),
        };

        if (isUpdate) {
            delete user.password;
            user.user_id = userId;
            user.token = token;
        }

        return user;
    }

    function formatUserInfo(isLogout = false) {
        return {
            birthday: birthday?.trim() || '',
            connectWith: {
                ageRange,
                distance,
                sameGender,
            },
            expoPushToken: !isLogout ? expoPushToken : '',
            gender,
            imgUrl: profileImg,
            isOnboarded,
            googleAccount,
            lastReaction,
            location: {
                city: city?.trim() || '',
                state: stateUS?.trim() || '',
                zip: zip?.trim() || '',
            },
            name: {
                first: firstName?.trim() || '',
                last: lastName?.trim() || '',
            },
        };
    }

    function setUserFromProfileResponse(res) {
        const { user_info } = res;
        const {
            profile_picture,
            images_visited,
            friends,
        } = user_info;

        dispatch({
            type: UserTypes.SET_USER_FIELDS,
            payload: {
                friends: JSON.parse(friends),
                imagesVisited: images_visited,
                profileImg: profile_picture,
            }
        });
    }

    async function setUserFromResponse(res) {
        const {
            uid,
            token,
            email,
            username,
            profile_picture,
            friends,
            info: infoJSON,
        } = res;
        const info = JSON.parse(infoJSON);
        const {
            isOnboarded,
            googleAccount,
            lastReaction,
            birthday,
            gender,
            connectWith,
            location,
            name,
        } = info;
        const {
            ageRange,
            distance,
            sameGender,
        } = connectWith;
        const {
            city,
            state: stateUS,
            zip
        } = location;

        dispatch({
            type: UserTypes.SET_USER_FIELDS,
            payload: {
                token,
                userId: uid,
                isOnboarded: Boolean(isOnboarded),
                googleAccount: Boolean(googleAccount),
                lastReaction,
                email,
                username,
                firstName: name.first,
                lastName: name.last,
                birthday,
                ageRange,
                city,
                state: stateUS,
                zip,
                distance,
                gender,
                sameGender: Boolean(sameGender),
                friends: JSON.parse(friends),
            }
        });

        // force update push token on every sign in
        // push token is unique every time the app is installed on a device
        const user = res;
        info.expoPushToken = await Notifications.getExpoPushTokenAsync();
        user.info = JSON.stringify(info);
        user.user_id = user.uid;
        delete user.uid;
        console.log({ user });
        doUpdateUser(user, null, true);
    }

    function resetState() {
        dispatch({ type: UserTypes.RESET_STATE })
    }
}

export function useUserContext() {
    if (!UserContext) {
        throw new Error('UserContext must be used with UserProvider');
    }

    return useContext(UserContext);
}
