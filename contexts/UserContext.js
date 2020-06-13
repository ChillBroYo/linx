import React, { useState } from 'react';

export const UserContext = React.createContext();

export const UserContextConsumer = UserContext.Consumer;

export function UserContextProvider({ children }) {
    // default values
    const defaultDistance = 25;
    const defaultAgeRange = [23, 29];
    const defaultSelectedInterests = new Set();

    const [token, setToken] = userState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRetype, setPasswordRetype] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [distance, setDistance] = useState(defaultDistance);
    const [birthday, setBirthday] = useState('');
    const [ageRange, setAgeRange] = useState(defaultAgeRange);
    const [gender, setGender] = useState('');
    const [sameGender, setSameGender] = useState(false);
    const [selectedInterests, setSelectedInterests] = useState(defaultSelectedInterests);
    const [sameInterests, setSameInterests] = useState(false);

    function formatUserInfo() {
        return {
            email: email.trim(),
            password: password,
            username: username.trim(),
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
                interests: [...selectedInterests],
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
        setEmail('');
        setPassword('');
        setPasswordRetype('');
        setUsername('');
        setFirstName('');
        setLastName('');
        setCity('');
        setState('');
        setDistance(defaultDistance);
        setBirthday('');
        setAgeRange(defaultAgeRange);
        setGender('');
        setSameGender(false);
        setSelectedInterests(defaultSelectedInterests);
        setSameInterests(false);
    }

    return (
        <UserContext.Provider value={{
            token, setToken,
            email, setEmail,
            password, setPassword,
            passwordRetype, setPasswordRetype,
            username, setUsername,
            firstName, setFirstName,
            lastName, setLastName,
            city, setCity,
            state, setState,
            distance, setDistance,
            birthday, setBirthday,
            ageRange, setAgeRange,
            gender, setGender,
            sameGender, setSameGender,
            selectedInterests, setSelectedInterests,
            sameInterests, setSameInterests,
            formatUserInfo,
            resetState,
        }}>
            {children}
        </UserContext.Provider>
    )
}

