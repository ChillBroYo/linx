import React, { useState } from 'react';
import { Alert } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import { getEnvVars } from '../environment';
const { apiUrl } = getEnvVars();

// default config for axios requests
const DEFAULT_CONFIG = {
    validateStatus: function (status) {
        return (status >= 200 && status < 300) || status == 400;
    },
};

export const UserContext = React.createContext();

export const UserContextConsumer = UserContext.Consumer;

export function UserContextProvider({ children }) {
    // default values
    const defaultDistance = 25;
    const defaultAgeRange = [23, 29];
    const defaultInterests = new Set();

    const [expoPushToken, setExpoPushToken] = useState('');
    const [userId, setUserId] = useState('');
    const [token, setToken] = useState('');
    const [isOnboarded, setIsOnboarded] = useState(false);
    const [lastReaction, setLastReaction] = useState(moment.utc().format('YYYY-MM-DDTHH:mm:ss'));
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [profileImg, setProfileImg] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [distance, setDistance] = useState(defaultDistance);
    const [birthday, setBirthday] = useState('');
    const [ageRange, setAgeRange] = useState(defaultAgeRange);
    const [gender, setGender] = useState('');
    const [sameGender, setSameGender] = useState(false);
    const [interests, setInterests] = useState(defaultInterests);
    const [sameInterests, setSameInterests] = useState(false);
    const [imagesVisited, setImagesVisited] = useState([]);
    const [friends, setFriends] = useState([]);

    const value = {
        expoPushToken, setExpoPushToken,
        userId, setUserId,
        token, setToken,
        isOnboarded, setIsOnboarded,
        lastReaction, setLastReaction,
        email, setEmail,
        password, setPassword,
        username, setUsername,
        profileImg, setProfileImg,
        firstName, setFirstName,
        lastName, setLastName,
        city, setCity,
        state, setState,
        zip, setZip,
        distance, setDistance,
        birthday, setBirthday,
        ageRange, setAgeRange,
        gender, setGender,
        sameGender, setSameGender,
        interests, setInterests,
        sameInterests, setSameInterests,
        imagesVisited, setImagesVisited,
        friends, setFriends,
        setUserFromResponse,
        setUserFromProfileResponse,
        doSignInUser,
        doGetUserProfile,
        doGetImage,
        doSignUpUser,
        doUploadProfileUser,
        doUpdateUser,
        doCompleteOnboardingUser,
        doReactImage,
        doUpdateImageIndex,
        formatUserForRequest,
        formatUserForImageUpload,
        formatUserForOnboarding,
        formatUserForReaction,
        formatUserForIndex,
        resetState,
    };

    function setUserFromResponse(res) {
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
            lastReaction,
            birthday,
            gender,
            interests,
            connectWith,
            location,
            name,
        } = info;
        const {
            ageRange,
            distance,
            sameGender,
            sameInterests,
        } = connectWith;
        const { city, state, zip } = location;

        setUserId(uid);
        setToken(token);
        setIsOnboarded(Boolean(isOnboarded));
        setLastReaction(lastReaction);
        setEmail(email);
        setUsername(username);
        setFirstName(name.first);
        setLastName(name.last);
        setBirthday(birthday);
        setAgeRange(ageRange);
        setCity(city);
        setState(state);
        setZip(zip);
        setDistance(distance);
        setGender(gender);
        setSameGender(sameGender);
        setInterests(new Set(interests));
        setSameInterests(sameInterests);
        setFriends(JSON.parse(friends));

        // update existing users with expo push token
        if (!info.expoPushToken && expoPushToken) {
            info.expoPushToken = expoPushToken;
            // TODO: fix update call error
            // only important for backwards compatibility
            // doUpdateUser({ info });
        }
    }

    function setUserFromProfileResponse(res) {
        const { user_info } = res;
        const {
            profile_picture,
            images_visited,
            friends,
        } = user_info;

        setProfileImg(profile_picture);
        setImagesVisited(images_visited);
        setFriends(friends);
    }

    function formatParams(user) {
        const params = new URLSearchParams();
        for (let key in user) {
            params.append(key, typeof user[key] == 'object' ? JSON.stringify(user[key]) : user[key]);
        }

        return params;
    }

    function formatFormData(user) {
        const formData = new FormData();
        for (let key in user) {
            formData.append(key, user[key])
        }

        return formData;
    }

    async function doSignInUser(user) {
        try {
            const API_ENDPOINT = `${apiUrl}/${__DEV__ ? 'sign_in' : 'sign-in'}`;
            const res = await axios.get(API_ENDPOINT, { params: user });
            const data = res.data;
            if (res.status != 200) {
                return Alert.alert('Sign in failed. Please try again');
            }
            if (!data.success || data.success == 'false') {
                return Alert.alert(data.errmsg);
            }

            setUserFromResponse(data);
            return true;
        }
        catch (error) {
            console.warn('Sign in error:', error);
            Alert.alert('Sign in failed. Please try again');
        }
    }

    async function doUpdateUser(user, callback) {
        try {
            const API_ENDPOINT = `${apiUrl}/${__DEV__ ? 'update_profile' : 'update-profile'}/`;
            const params = formatParams(user);
            const res = await axios.post(API_ENDPOINT, params, DEFAULT_CONFIG);
            const data = res.data;
            if (res.status != 200 || !data.success || data.success == 'false') {
                return Alert.alert(data?.errmsg || 'Update failed. Please try again.');
            }

            if (callback) {
                await callback();
            }
            Alert.alert('Your settings have been updated');
        }
        catch (error) {
            console.warn('Update failed:', error);
            Alert.alert('Update failed. Please try again');
        }
    }

    async function doSignUpUser(user) {
        try {
            const API_ENDPOINT = `${apiUrl}/${__DEV__ ? 'sign_up' : 'sign-up'}/`;
            const params = formatParams(user);
            const res = await axios.post(API_ENDPOINT, params, DEFAULT_CONFIG);
            const data = res.data;
            if (res.status != 200 || !data.success || data.success == 'false') {
                return Alert.alert(data?.errmsg || 'Sign up failed. Please try again.');
            }

            return true;
        } catch (error) {
            console.warn('Sign up error:', error);
            Alert.alert('Sign up failed. Please try again');
        }
    }

    async function doUploadProfileUser(user) {
        try{
            const API_ENDPOINT = `${apiUrl}/${__DEV__ ? 'save_image' : 'save-image'}/`;
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
            setProfileImg(data.image_url);
            return true;
        } catch (error) {
            console.warn('Profile upload error:', error);
            Alert.alert('Profile upload failed. Please try again');
        }
    }

    async function doCompleteOnboardingUser(user) {
        try {
            const API_ENDPOINT = `${apiUrl}/${__DEV__ ? 'update_profile' : 'update-profile'}/`;
            const params = formatParams(user);
            const res = await axios.post(API_ENDPOINT, params, DEFAULT_CONFIG);
            const data = res.data;
            if (res.status != 200 || !data.success || data.success == 'false') {
                return Alert.alert(data?.errmsg || 'Onboarding completion failed. Please try again.');
            }

            return true;
        } catch (error) {
            console.warn('Onboarding completion error:', error);
            Alert.alert('Onboarding completion failed. Please try again');
        }
    }

    async function doGetUserProfile(user) {
        try {
            const API_ENDPOINT = `${apiUrl}/${__DEV__ ? 'get_profile' : 'get-profile'}`;
            const res = await axios.get(API_ENDPOINT, { params: user });
            const data = res.data;
            if (res.status != 200) {
                return Alert.alert('Get user profile failed. Please try again');
            }
            if (!data.success || data.success == 'false') {
                return Alert.alert(data.errmsg);
            }

            setUserFromProfileResponse(data);
            return {imageIndex: data.user_info.image_index};
        }
        catch (error) {
            console.warn('Get user profile error:', error);
            Alert.alert('Get user profile failed. Please try again');
        }
    }

    async function doGetImage(image) {
        try {
            const API_ENDPOINT = `${apiUrl}/${__DEV__ ? 'get_image' : 'get-image'}`;
            const res = await axios.get(API_ENDPOINT, { params: image });
            const data = res.data;
            if (res.status != 200) {
                //return Alert.alert('Get image failed. Please try again');
                return false;
            }
            if (data.success == 'false') {
                return false;
            }

            return {
                imageId: data.image_id,
                imageCategory: data.image_category,
                imageLink: data.link,
            };
        }
        catch (error) {
            //console.warn('Get image error:', error);
            //Alert.alert('Get image failed. Please try again');
            return false;
        }
    }

    async function doReactImage(user) {
        try {
            const API_ENDPOINT = `${apiUrl}/${__DEV__ ? 'react_to_image' : 'react-to-image'}/`;
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
        } catch (error) {
            console.warn('Reaction error:', error);
            Alert.alert('Reaction failed. Please try again');
        }
    }

    async function doUpdateImageIndex(user) {
        try {
            const API_ENDPOINT = `${apiUrl}/${__DEV__ ? 'update_profile' : 'update-profile'}/`;
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
        } catch (error) {
            console.warn('Update card profile error:', error);
            Alert.alert('Update card profile failed. Please try again');
        }
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
            // TODO: fields below need to be updated
            // user.image_index = 0;
            // user.images_visited = [];
            // user.friends = [];
        }

        return user;
    }

    function formatUserForImageUpload() {
        const name = 'profile_' + String(userId) + '_' + String(moment.utc().format('YYYY-MM-DDTHH:mm:ss')) + '.jpg';
        const type = 'image/jpeg';

        let user = {
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

        return user;
    }

    function formatUserForOnboarding() {
        let user = {
            user_id: userId,
            token,
            info: formatUserInfo(),
        };

        return user;
    }

    function formatUserForReaction(reactionType, imageId) {
        let user = {
            uid: userId,
            token,
            image_id: imageId,
            reaction_type: reactionType,
        };

        return user;
    }

    function formatUserForIndex(index) {
        let user = {
            user_id: userId,
            token,
            image_index: index,
            info: formatUserInfo(),
        }

        return user;
    }

    function formatUserInfo() {
        return {
            birthday: birthday?.trim() || '',
            connectWith: {
                ageRange,
                distance,
                sameGender,
                sameInterests,
            },
            expoPushToken,
            gender,
            imgUrl: profileImg,
            interests: [...interests],
            isOnboarded,
            lastReaction,
            location: {
                city: city?.trim() || '',
                state: state?.trim() || '',
                zip: zip?.trim() || '',
            },
            name: {
                first: firstName?.trim() || '',
                last: lastName?.trim() || '',
            },
        };
    }

    function resetState() {
        setExpoPushToken('');
        setUserId('');
        setToken('');
        setIsOnboarded(false);
        setLastReaction(moment.utc().format('YYYY-MM-DDTHH:mm:ss'));
        setEmail('');
        setPassword('');
        setUsername('');
        setProfileImg('');
        setFirstName('');
        setLastName('');
        setCity('');
        setState('');
        setZip('');
        setDistance(defaultDistance);
        setBirthday('');
        setAgeRange(defaultAgeRange);
        setGender('');
        setSameGender(false);
        setInterests(defaultInterests);
        setSameInterests(false);
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
