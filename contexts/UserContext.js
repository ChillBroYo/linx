import React, { useState } from 'react';

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

    function formatUserInfoForSignUp() {
        return {
            email: email.trim(),
            password: password,
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
                isOnboarded: false,
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
        <UserContext.Provider value={{
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
            setUserFromResponse,
            formatUserInfoForSignUp,
            resetState,
        }}>
            {children}
        </UserContext.Provider>
    )
}

