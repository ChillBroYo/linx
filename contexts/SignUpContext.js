import React, { useState } from 'react';

export const SignUpContext = React.createContext();

export const SignUpContextConsumer = SignUpContext.Consumer;

export function SignUpContextProvider({ children }) {
    // default values
    const defaultDistance = 25;
    const defaultAgeRange = [23, 29];
    const defaultSelectedInterests = new Set();
    // screen 1
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRetype, setPasswordRetype] = useState('');
    const [username, setUsername] = useState('');
    // screen 2
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    // screen 3
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [distance, setDistance] = useState(defaultDistance);
    // screen 4
    const [birthday, setBirthday] = useState('');
    const [ageRange, setAgeRange] = useState(defaultAgeRange);
    // screen 5
    const [gender, setGender] = useState('');
    const [sameGender, setSameGender] = useState(false);
    // screen 6
    const [selectedInterests, setSelectedInterests] = useState(defaultSelectedInterests);
    const [sameInterests, setSameInterests] = useState(false);

    function formatUserInfo() {
        return {
            email,
            password,
            username,
            security_level: 'user',
            info: {
                birthday,
                connectWith: {
                    ageRange,
                    distance,
                    sameGender,
                    sameInterests,
                },
                gender,
                interests: selectedInterests,
                location: {
                    city,
                    state,
                },
                name: {
                    first,
                    last,
                },
            },
        };
    }

    function resetState() {
        // screen 1
        setEmail('');
        setPassword('');
        setPasswordRetype('');
        setUsername('');
        // screen 2
        setFname('');
        setLname('');
        // screen 3
        setCity('');
        setState('');
        setDistance(defaultDistance);
        // screen 4
        setBirthday('');
        setAgeRange(defaultAgeRange);
        // screen 5
        setGender('');
        setSameGender(false);
        // screen 6
        setSelectedInterests(defaultSelectedInterests);
        setSameInterests(false);
    }

    return (
        <SignUpContext.Provider value={{
            email, setEmail,
            password, setPassword,
            passwordRetype, setPasswordRetype,
            username, setUsername,
            fname, setFname,
            lname, setLname,
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
        </SignUpContext.Provider>
    )
}


const defaultUser = {
    email: '',
    password: '',
    username: '',
    security_level: 'user',
    info: {
        birthday: '',
        connectWith: {
            ageRange: null,
            distance: null,
            sameGender: false,
            sameInterests: false,
        },
        gender: '',
        interests: null,
        location: {
            city: '',
            state: '',
        },
        name: {
            first: '',
            last: '',
        },
    },
};
