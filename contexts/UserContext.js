import React, { useState } from 'react';
import { Alert } from 'react-native';
import moment from 'moment';
import axios from 'axios';
import { getEnvVars } from '../environment';
const { apiUrl } = getEnvVars();

export const UserContext = React.createContext();

export const UserContextConsumer = UserContext.Consumer;

export function UserContextProvider({ children }) {
    // default values
    const defaultDistance = 25;
    const defaultAgeRange = [23, 29];
    const defaultInterests = new Set();

    const [userId, setUserId] = useState('');
    const [token, setToken] = useState('');
    const [isOnboarded, setIsOnboarded] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [profileImg, setProfileImg] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [distance, setDistance] = useState(defaultDistance);
    const [birthday, setBirthday] = useState('');
    const [ageRange, setAgeRange] = useState(defaultAgeRange);
    const [gender, setGender] = useState('');
    const [sameGender, setSameGender] = useState(false);
    const [interests, setInterests] = useState(defaultInterests);
    const [sameInterests, setSameInterests] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    const [imagesVisited, setImagesVisited] = useState([]);
    const [friends, setFriends] = useState([]);
    const [createdAt, setCreatedAt] = useState('');
    const [imageId, setImageId] = useState('');
    const [imageCategory, setImageCategory] = useState(6);
    const [imageLink, setImageLink] = useState('');

    const value = {
        userId, setUserId,
        token, setToken,
        isOnboarded, setIsOnboarded,
        email, setEmail,
        password, setPassword,
        username, setUsername,
        profileImg, setProfileImg,
        firstName, setFirstName,
        lastName, setLastName,
        city, setCity,
        state, setState,
        distance, setDistance,
        birthday, setBirthday,
        ageRange, setAgeRange,
        gender, setGender,
        sameGender, setSameGender,
        interests, setInterests,
        sameInterests, setSameInterests,
        imageIndex, setImageIndex,
        imagesVisited, setImagesVisited,
        friends, setFriends,
        createdAt, setCreatedAt,
        imageId, setImageId,
        imageCategory, setImageCategory,
        imageLink, setImageLink,
        setUserFromResponse,
        setUserFromProfileResponse,
        setImageFromResponse,
        doSignInUser,
        doGetUserProfile,
        doGetImage,
        doSignUpUser,
        doUploadProfileUser,
        doUpdateUser,
        doCompleteOnboardingUser,
        doReactImage,
        formatUserForRequest,
        formatUserForImageUpload,
        formatUserForOnboarding,
        formatUserForReaction,
        resetState,
    };

    function setUserFromResponse(res) {
        const {
            uid,
            token,
            email,
            username,
            profile_picture,
            info,
        } = res;
        const {
            isOnboarded,
            birthday,
            gender,
            interests,
            connectWith,
            location,
            name,
        } = JSON.parse(info);
        const {
            ageRange,
            distance,
            sameGender,
            sameInterests,
        } = connectWith;
        const { city, state } = location;

        setUserId(uid);
        setToken(token);
        setIsOnboarded(Boolean(isOnboarded));
        setEmail(email);
        setUsername(username);
        setProfileImg(profile_picture);
        setFirstName(name.first);
        setLastName(name.last);
        setBirthday(birthday);
        setAgeRange(ageRange);
        setCity(city);
        setState(state);
        setDistance(distance);
        setGender(gender);
        setSameGender(sameGender);
        setInterests(new Set(interests));
        setSameInterests(sameInterests);
    }

    function setUserFromProfileResponse(res) {
        const { user_info } = res;
        const {
            profile_picture,
            image_index,
            images_visited,
            friends,
            created_at,
        } = user_info;

        setProfileImg(profile_picture);
        setImageIndex(image_index);
        setImagesVisited(images_visited);
        setFriends(friends);
        setCreatedAt(created_at);
    }

    function setImageFromResponse(res) {
        const { image_id, image_category, link } = res;

        setImageId(image_id);
        setImageCategory(image_category);
        setImageLink(link);
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
            console.error('Sign in error:', error);
            Alert.alert('Sign in failed. Please try again');
        }
    }

    async function doUpdateUser(user, callback) {
        try {
            const API_ENDPOINT = `${apiUrl}/${__DEV__ ? 'update_profile' : 'update-profile'}/`;
            const params = formatParams(user);
            const res = await axios.post(API_ENDPOINT, params);
            const data = res.data;
            if (res.status != 200) {
                return Alert.alert('Update failed. Please try again');
            }
            if (!data.success || data.success == 'false') {
                return Alert.alert(data.errmsg);
            }

            if (callback) {
                await callback();
            }
            Alert.alert('Your settings have been updated');
        }
        catch (error) {
            console.error('doUpdateUser failed:', error);
            Alert.alert('Update failed. Please try again');
        }
    }

    async function doSignUpUser(user) {
        try {
            const API_ENDPOINT = `${apiUrl}/${__DEV__ ? 'sign_up' : 'sign-up'}/`;
            const params = formatParams(user);
            const res = await axios.post(API_ENDPOINT, params);
            const data = res.data;
            if (res.status != 200) {
                return Alert.alert('Sign up failed. Please try again');
            }
            if (!data.success || data.success == 'false') {
                return Alert.alert(data.errmsg);
            }

            return true;
        } catch (error) {
            console.error('Sign up error:', error);
            Alert.alert('Sign up failed. Please try again');
        }
    }

    async function doUploadProfileUser(user) {
        try{
            const API_ENDPOINT = `${apiUrl}/${__DEV__ ? 'save_image' : 'save-image'}/`;
            const formData = formatFormData(user);
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const res = await axios.post(API_ENDPOINT, formData, config);
            const data = res.data;
            if (res.status != 200) {
                return Alert.alert('Profile upload failed. Please try again');
            }
            if (!data.success || data.success == 'false') {
                return Alert.alert(data.errmsg);
            }
            
            return true;
        } catch (error) {
            console.error('doUploadProfile error:', error);
            Alert.alert('Profile upload failed. Please try again');
        }
    }

    async function doCompleteOnboardingUser(user) {
        try {
            const API_ENDPOINT = `${apiUrl}/${__DEV__ ? 'update_profile' : 'update-profile'}/`;
            const params = formatParams(user);
            const res = await axios.post(API_ENDPOINT, params);
            const data = res.data;
            if (res.status != 200) {
                return Alert.alert('Onboarding completion failed. Please try again');
            }
            if (!data.success || data.success == 'false') {
                return Alert.alert(data.errmsg);
            }

            return true;
        } catch (error) {
            console.error('doCompleteOnboarding error:', error);
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
            return true;
        }
        catch (error) {
            console.error('Get user profile error:', error);
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

            setImageFromResponse(data);
            return true;
        }
        catch (error) {
            //console.error('Get image error:', error);
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
            console.error('Reaction error:', error);
            Alert.alert('Reaction failed. Please try again');
        }
    }

    function formatUserForRequest(isUpdate = false) {
        let user = {
            email: email.trim(),
            password,
            username: username.trim(),
            profile_picture: profileImg,
            security_level: 'user',
            info: {
                birthday: birthday.trim(),
                connectWith: {
                    ageRange,
                    distance,
                    sameGender,
                    sameInterests,
                },
                gender,
                imgUrl: profileImg,
                interests: [...interests],
                isOnboarded,
                location: {
                    city: city.trim(),
                    state: state.trim(),
                },
                name: {
                    first: firstName.trim(),
                    last: lastName.trim(),
                },
            },
        };

        if (isUpdate) {
            user.user_id = userId;
            user.token = token;
            user.image_index = 0;
            user.images_visited = [];
            user.friends = [];
            delete user.password;
        }

        return user;
    }

    function formatUserForImageUpload() {
        const name = 'profile_' + String(userId) + '_' + String(moment().format());
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
        };

        return user;
    }

    function formatUserForOnboarding() {
        let user = {
            user_id: userId,
            token,
            info: {
                birthday: birthday.trim(),
                connectWith: {
                    ageRange,
                    distance,
                    sameGender,
                    sameInterests,
                },
                gender,
                imgUrl: profileImg,
                interests: [...interests],
                isOnboarded,
                location: {
                    city: city.trim(),
                    state: state.trim(),
                },
                name: {
                    first: firstName.trim(),
                    last: lastName.trim(),
                },
            },
        };

        return user;
    }

    function formatUserForReaction(reactionType) {
        let user = {
            uid: userId,
            token,
            image_id: imageId,
            reaction_type: reactionType,
        };

        return user;
    }

    function resetState() {
        setUserId('');
        setToken('');
        setIsOnboarded(false);
        setEmail('');
        setPassword('');
        setUsername('');
        setProfileImg('');
        setFirstName('');
        setLastName('');
        setCity('');
        setState('');
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
