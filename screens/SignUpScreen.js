import React, { useState } from 'react';
import {
    Alert,
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { LinearGradient} from 'expo-linear-gradient';

export default function SignUp({ navigation }) {
    const [page, setPage] = useState(1);
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
    const [distance, setDistance] = useState(25);
    // screen 4
    const [birthday, setBirthday] = useState('');
    const [ageRange, setAgeRange] = useState([23, 29]);
    // screen 5
    const [gender, setGender] = useState('');
    const [sameGender, setSameGender] = useState(false);
    // screen 6
    const interests = ['art', 'food', 'nature', 'sports'];
    const [selectedInterests, setSelectedInterests] = useState(new Set());
    const [sameInterests, setSameInterests] = useState(false);

    function onBack() {
        page == 1 ? onBackToSignIn() : setPage(page - 1);
    }

    function onBackToSignIn() {
        navigation.navigate('SignIn');
    }

    function onContinue() {
        if (page == 1) {
            if (!username) {
                Alert.alert('Username is empty');
                return;
            }
            else if (!email) {
                Alert.alert('Email is empty');
                return;
            }
            else if (!password || !passwordRetype) {
                Alert.alert('Password is empty');
                return;
            }
            else if (password !== passwordRetype) {
                Alert.alert("Passwords do not match");
                return;
            }
            else {
                if (!validateUsername()) {
                    Alert.alert('Username is already taken');
                    return;
                }
                if (!validateEmail()) {
                    Alert.alert('Email is already taken');
                    return;
                }
            }
        }
        else if (page == 2) {
            if (!fname) {
                Alert.alert('First name is empty');
                return;
            }
            else if (!lname) {
                Alert.alert('Last name is empty');
                return;
            }
        }
        else if (page == 3) {
            if (!city || !state) {
                Alert.alert('Missing City or State');
                return;
            }
            else if (!state) {
                Alert.alert('State is empty');
                return;
            }
        }

        setPage(page + 1);
    }

    function validateEmail() {
        // TODO: check if email is already in DB
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return emailRegex.test(email);
    }

    function validateUsername() {
        // TODO: check if username is already in DB
        return true;
    }

    async function onSubmit() {
        let emailData = `email=${email.trim()}`;
        let usernameData = `username=${username.trim()}`;
        let passwordData = `password=${password.trim()}`;
        let securityLevelData = `security_level=user`;
        let info = {
            name: {
                first: fname.trim(),
                last: lname.trim(),
            },
            city: city.trim(),
            state: state.trim(),
            distance,
            birthday: birthday.trim().replace(' ', ''),
            ageRange,
            gender,
            sameGender,
            interests: [...selectedInterests],
            sameInterests,
        };
        let infoData = `info=${JSON.stringify(info)}`;

        try {
            const res = await fetch(`http://192.168.1.15:8080/sign_up/?${emailData}&${usernameData}&${passwordData}&${securityLevelData}&${infoData}`)
            const json = await res.json();

            console.log('RESPONSE:', res);
            console.log('JSON:', json);

            if (res.status != 200) {
                Alert.alert('Sign up failed. Please try again');
                return;
            }
            if (!json.success) {
                Alert.alert(json.errmsg);
                return;
            }

            navigation.navigate('SignIn');
        }
        catch(error) {
            console.log('Sign Up error:', error);
        }
    }

    let view;
    if (page == 1) {
        view = <SignUpOne
            email={email}
            password={password}
            passwordRetype={passwordRetype}
            username={username}
            setEmail={setEmail}
            setPassword={setPassword}
            setPasswordRetype={setPasswordRetype}
            setUsername={setUsername}
        />;
    }
    else if (page == 2) {
        view = <SignUpTwo
            fname={fname}
            lname={lname}
            setFname={setFname}
            setLname={setLname}
        />;
    }
    else if (page == 3) {
        view = <SignUpThree
            city={city}
            state={state}
            distance={distance}
            setCity={setCity}
            setState={setState}
            setDistance={setDistance}
        />;
    }
    else if (page == 4) {
        view = <SignUpFour
            birthday={birthday}
            ageRange={ageRange}
            setBirthday={setBirthday}
            setAgeRange={setAgeRange}
        />;
    }
    else if (page == 5) {
        view = <SignUpFive
            gender={gender}
            sameGender={sameGender}
            setGender={setGender}
            setSameGender={setSameGender}
        />;
    }
    else if (page == 6) {
        view = <SignUpSix
            interests={interests}
            selectedInterests={selectedInterests}
            sameInterests={sameInterests}
            setSelectedInterests={setSelectedInterests}
            setSameInterests={setSameInterests}
        />;
    }

    return (
        <KeyboardAvoidingView behavior='height' style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <LinearGradient colors={['rgba(254, 241, 2, 0)', 'rgba(254, 241, 2, 0.1)']} style={styles.container}>
                        <View style={styles.topPadder} />
                        <ProgressBar page={page} totalPages={6} />
                        <View style={{flex: 1}}>
                            <Text onPress={onBack} style={styles.backArrow}>&#10094;</Text>
                            {view}
                            <TouchableWithoutFeedback onPress={page < 6 ? onContinue : onSubmit}>
                                <View style={styles.continue}>
                                    <Text style={styles.continueText}>{page < 6 ? 'Continue' : 'Done'}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                </LinearGradient>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

function SignUpOne({
    username,
    email,
    password,
    passwordRetype,
    setUsername,
    setEmail,
    setPassword,
    setPasswordRetype
}) {
    return (
        <View style={styles.container}>
            <Text style={styles.signUpHeader}>Sign up</Text>
            <View style={styles.signUpForm}>
                <TextInput
                    name='username'
                    placeholder='Username'
                    value={username}
                    onChangeText={username => setUsername(username)}
                    style={styles.signUpInput}
                />
                <TextInput
                    keyboardType='email-address'
                    name='email'
                    placeholder='Email'
                    value={email}
                    onChangeText={email => setEmail(email)}
                    style={styles.signUpInput}
                />
                <TextInput
                    secureTextEntry
                    name='password'
                    placeholder='Password'
                    value={password}
                    onChangeText={password => setPassword(password)}
                    style={styles.signUpInput}
                />
                <TextInput
                    secureTextEntry
                    name='passwordRetype'
                    placeholder='Retype Password'
                    value={passwordRetype}
                    onChangeText={password => setPasswordRetype(password)}
                    style={styles.signUpInput}
                />
            </View>
        </View>
    );
}

function SignUpTwo({ fname, lname, setFname, setLname }) {
    return (
        <View style={styles.container}>
            <Text style={styles.signUpHeader}>My name is</Text>
            <View style={styles.signUpForm}>
                <TextInput
                    name='fname'
                    placeholder='First Name'
                    value={fname}
                    onChangeText={fname => setFname(fname)}
                    style={styles.signUpInput}
                />
                <TextInput
                    name='lname'
                    placeholder='Last Name'
                    value={lname}
                    onChangeText={lname => setLname(lname)}
                    style={styles.signUpInput}
                />
            </View>
        </View>
    );
}

function SignUpThree({
    city,
    state,
    distance,
    setCity,
    setState,
    setDistance
}) {
    return (
        <View style={styles.container}>
            <Text style={styles.signUpHeader}>I live in</Text>
            <View style={styles.signUpForm}>
                <TextInput
                    placeholder='City'
                    value={city}
                    onChangeText={city => setCity(city)}
                    style={styles.signUpInput}
                />
                <TextInput
                    placeholder='State'
                    value={state}
                    onChangeText={state => setState(state)}
                    style={styles.signUpInput}
                />
                <Text style={styles.signUpText}>
                    Connect with people who are less than <Text style={styles.signUpTextValue}>{distance}</Text> miles away
                </Text>
                <MultiSlider
                    min={5}
                    max={50}
                    values={[distance]}
                    onValuesChange={distance => setDistance(parseInt(distance))}
                    selectedStyle={{backgroundColor: colors.purple}}
                    trackStyle={{backgroundColor: colors.purple}}
                />
            </View>
        </View>
    );
}

function SignUpFour({ birthday, ageRange, setBirthday, setAgeRange }) {
    return (
        <View style={styles.container}>
            <Text style={styles.signUpHeader}>My birthday is</Text>
            <View style={styles.signUpForm}>
                <TextInputMask
                    keyboardType='number-pad'
                    type='datetime'
                    options={{ format:'MM / DD / YYYY' }}
                    placeholder='MM / DD / YYYY'
                    value={birthday}
                    onChangeText={setBirthday}
                    style={{...styles.signUpInput, borderBottomWidth: 0, textAlign: 'center'}}
                />
                <Text style={styles.signUpText}>
                    Connect with people who are between <Text style={styles.signUpTextValue}>{ageRange[0]}</Text> and <Text style={styles.signUpTextValue}>{ageRange[1]}</Text> years old
                </Text>
                <MultiSlider
                    min={18}
                    max={99}
                    values={ageRange}
                    onValuesChange={ageRange => setAgeRange(ageRange.map(age => parseInt(age)))}
                    selectedStyle={{backgroundColor: colors.purple}}
                    trackStyle={{backgroundColor: colors.purple}}
                />
            </View>
        </View>
    );
}

function SignUpFive({
    gender,
    sameGender,
    setGender,
    setSameGender
}) {
    const options = ['woman', 'man', 'other'];

    return (
        <View style={styles.container}>
            <Text style={styles.signUpHeader}>I'm a</Text>
            <View style={styles.signUpForm}>
                { options.map(optGender => (
                    <PillButton
                        key={optGender}
                        selected={gender == optGender}
                        text={optGender}
                        onPress={() => setGender(optGender)}
                    />
                )) }
                <Text style={styles.signUpText}>
                    Connect only with the same gender as me
                </Text>
                <Switch
                    value={sameGender}
                    onValueChange={sameGender => setSameGender(sameGender)}
                    trackColor={{ false: colors.grey, true: colors.purple }}
                    style={styles.toggle}
                />
            </View>
        </View>
    );
}

function SignUpSix({
    interests,
    selectedInterests,
    sameInterests,
    setSelectedInterests,
    setSameInterests
}) {
    // FlatList renderItem passes { index: <i>, item: <data[i]> }
    function renderInterest({ item: interest }) {
        let isSelected = selectedInterests.has(interest);

        return (
            <PillButton
                selected={isSelected}
                text={interest}
                onPress={() => toggleInterest(interest)}
            />
        );
    }

    function toggleInterest(interest) {
        let nextInterests = new Set([...selectedInterests]);
        selectedInterests.has(interest) ? nextInterests.delete(interest) : nextInterests.add(interest);
        setSelectedInterests(nextInterests);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.signUpHeader}>I like</Text>
            <View style={{...styles.signUpForm, ...styles.signUpFormWide}} wide={true}>
                <FlatList
                    data={interests}
                    extraData={selectedInterests}
                    horizontal={false}
                    numColumns={2}
                    renderItem={renderInterest}
                />
                <Text style={styles.signUpText}>
                    Connect only with people that like the same things as me
                </Text>
                <Switch
                    value={sameInterests}
                    onValueChange={sameInterests => setSameInterests(sameInterests)}
                    trackColor={{ false: colors.grey, true: colors.purple }}
                    style={styles.toggle}
                />
            </View>
        </View>
    );
}

function PillButton({ selected, text, onPress }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={{...styles.pillButton, ...(selected ? styles.pillButtonSelected : {})}}>
                <Text style={{...styles.pillButtonText, ...(selected ? styles.pillButtonTextSelected : {})}}>
                    {text}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

function ProgressBar({ page, totalPages }) {
    return (
        <View style={{...styles.progressBar, width: `${(page / totalPages) * 100}%`}} />
    );
}

// STYLES
const colors = {
    black: '#1B1B1B',
    green: '#439E73',
    grey: '#8D99AE',
    purple: '#8002FE',
    white: '#FFF',
};

const styles = StyleSheet.create({
    backArrow: {
        color: colors.black,
        fontSize: 36,
        fontWeight: '900',
        marginBottom: 0,
        marginTop: 12,
        marginLeft: 30,
        marginRight: 30,
    },
    container: {
        flex: 1,
    },
    continue: {
        alignItems: 'center',
        backgroundColor: colors.grey,
        justifyContent: 'center',
        height: 66,
        marginTop: 16,
    },
    continueText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 27,
    },
    pillButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderColor: colors.black,
        borderRadius: 100,
        borderStyle: 'solid',
        borderWidth: 1,
        height: 42,
        width: 140,
        marginBottom: 23,
        marginTop: 0,
        marginLeft: 11,
        marginRight: 11,
        paddingLeft: 5,
        paddingRight: 5,
    },
    pillButtonSelected: {
        backgroundColor: colors.purple,
        borderColor: colors.purple,
    },
    pillButtonText: {
        color: colors.black,
        fontSize: 20,
        fontWeight: '400',
    },
    pillButtonTextSelected: {
        color: colors.white,
        fontWeight: '700',
    },
    progressBar: {
        backgroundColor: colors.purple,
        height: 11,
    },
    signUpForm: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 0,
        marginTop: 0,
        marginLeft: 60,
        marginRight: 60,
    },
    signUpFormWide: {
        marginLeft: 20,
        marginRight: 20,
    },
    signUpHeader: {
        color: colors.purple,
        fontSize: 30,
        lineHeight: 41,
        marginBottom: 32,
        marginTop: 16,
        marginLeft: 60,
        marginRight: 60,
    },
    signUpInput: {
        borderBottomColor: colors.black,
        borderBottomWidth: 1,
        fontSize: 20,
        marginBottom: 10,
        padding: 10,
        height: 44,
        width: '100%',
    },
    signUpText: {
        color: 'black',
        fontSize: 20,
        lineHeight: 25,
        marginTop: 20,
        width: 252,
    },
    signUpTextValue: {
        color: colors.purple,
        fontWeight: '700',
    },
    toggle: {
        marginTop: 16,
        height: 36,
        width: 80,
    },
    topPadder: {
        backgroundColor: colors.grey,
        height: 40,
    },
});
