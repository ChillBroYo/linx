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
import styled from '@emotion/native'

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
        const emailRegex = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
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
            birthday: birthday.trim(),
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
        // SafeAreaView automatically adjusts for the notch on iOS
        <Container>
            <LinearGradient colors={['rgba(254, 241, 2, 0)', 'rgba(254, 241, 2, 0.1)']} style={{flex: 1}}>
                <KeyboardAvoidingView behavior='height' style={{flex: 1}}>
                    <SafeAreaView style={{flex: 1}}>
                        <ProgressBar page={page} />
                        <View style={{flex: 1}}>
                            <Back onPress={onBack}>&#10094;</Back>
                            {view}
                            <TouchableWithoutFeedback onPress={page < 6 ? onContinue : onSubmit}>
                                <Continue>
                                    <Text style={{color: 'white', fontSize: 20, fontWeight: '600', lineHeight: 27}}>Continue</Text>
                                </Continue>
                            </TouchableWithoutFeedback>
                        </View>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </LinearGradient>
        </Container>
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
        <SignUpWrapper>
            <SignUpHeader>Sign up</SignUpHeader>
            <SignUpFormWrapper>
                <SignUpTextInput
                    name='username'
                    placeholder='Username'
                    value={username}
                    onChangeText={username => setUsername(username)}
                    style={styles.input}
                />
                <SignUpTextInput
                    keyboardType='email-address'
                    name='email'
                    placeholder='Email'
                    value={email}
                    onChangeText={email => setEmail(email)}
                    style={styles.input}
                />
                <SignUpTextInput
                    secureTextEntry
                    name='password'
                    placeholder='Password'
                    value={password}
                    onChangeText={password => setPassword(password)}
                    style={styles.input}
                />
                <SignUpTextInput
                    secureTextEntry
                    name='passwordRetype'
                    placeholder='Retype Password'
                    value={passwordRetype}
                    onChangeText={password => setPasswordRetype(password)}
                    style={styles.input}
                />
            </SignUpFormWrapper>
        </SignUpWrapper>
    );
}

function SignUpTwo({ fname, lname, setFname, setLname }) {
    return (
        <SignUpWrapper>
            <SignUpHeader>My name is</SignUpHeader>
            <SignUpFormWrapper>
                <SignUpTextInput
                    name='fname'
                    placeholder='First Name'
                    value={fname}
                    onChangeText={fname => setFname(fname)}
                    style={styles.input}
                />
                <SignUpTextInput
                    name='lname'
                    placeholder='Last Name'
                    value={lname}
                    onChangeText={lname => setLname(lname)}
                    style={styles.input}
                />
            </SignUpFormWrapper>
        </SignUpWrapper>
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
        <SignUpWrapper>
            <SignUpHeader>I live in</SignUpHeader>
            <SignUpFormWrapper>
                <SignUpTextInput
                    placeholder='City'
                    value={city}
                    onChangeText={city => setCity(city)}
                    style={styles.input}
                />
                <SignUpTextInput
                    placeholder='State'
                    value={state}
                    onChangeText={state => setState(state)}
                    style={styles.input}
                />
                <SignUpText>
                    Connect with people who are less than <SignUpTextValue>{distance}</SignUpTextValue> miles away
                </SignUpText>
                <MultiSlider
                    min={5}
                    max={50}
                    values={[distance]}
                    onValuesChange={distance => setDistance(parseInt(distance))}
                    selectedStyle={{backgroundColor: PURPLE}}
                    trackStyle={{backgroundColor: PURPLE}}
                />
            </SignUpFormWrapper>
        </SignUpWrapper>
    );
}

function SignUpFour({ birthday, ageRange, setBirthday, setAgeRange }) {
    return (
        <SignUpWrapper>
            <SignUpHeader>My birthday is</SignUpHeader>
            <SignUpFormWrapper>
                <TextInputMask
                    keyboardType='number-pad'
                    type='datetime'
                    options={{ format:'MM/DD/YYYY' }}
                    placeholder='MM/DD/YYYY'
                    value={birthday}
                    onChangeText={setBirthday}
                />
                <SignUpText>
                    Connect with people who are between <SignUpTextValue>{ageRange[0]}</SignUpTextValue> and <SignUpTextValue>{ageRange[1]}</SignUpTextValue> years old
                </SignUpText>
                <MultiSlider
                    min={18}
                    max={99}
                    values={ageRange}
                    onValuesChange={ageRange => setAgeRange(ageRange.map(age => parseInt(age)))}
                    selectedStyle={{backgroundColor: PURPLE}}
                    trackStyle={{backgroundColor: PURPLE}}
                />
            </SignUpFormWrapper>
        </SignUpWrapper>
    );
}

function SignUpFive({
    gender,
    sameGender,
    setGender,
    setSameGender
}) {
    return (
        <SignUpWrapper>
            <SignUpHeader>I'm a</SignUpHeader>
            <SignUpFormWrapper>
                <TouchableWithoutFeedback onPress={() => setGender('woman')}>
                    <PillButton selected={gender == 'woman'}>
                        <PillText selected={gender == 'woman'}>Woman</PillText>
                    </PillButton>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setGender('man')}>
                    <PillButton selected={gender == 'man'}>
                        <PillText selected={gender == 'man'}>Man</PillText>
                    </PillButton>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => setGender('other')}>
                    <PillButton selected={gender == 'other'}>
                        <PillText selected={gender == 'other'}>Other</PillText>
                    </PillButton>
                </TouchableWithoutFeedback>
                <SignUpText>Connect only with the same gender as me</SignUpText>
                <Toggle
                    value={sameGender}
                    onValueChange={sameGender => setSameGender(sameGender)}
                    trackColor={{
                        false: '#8D99AE',
                        true: PURPLE
                    }}
                />
            </SignUpFormWrapper>
        </SignUpWrapper>
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
            <TouchableWithoutFeedback onPress={() => toggleInterest(interest)}>
                <PillButton selected={isSelected}>
                    <PillText selected={isSelected}>{interest}</PillText>
                </PillButton>
            </TouchableWithoutFeedback>
        );
    }

    function toggleInterest(interest) {
        let nextInterests = new Set([...selectedInterests]);
        selectedInterests.has(interest) ? nextInterests.delete(interest) : nextInterests.add(interest);
        setSelectedInterests(nextInterests);
    }

    return (
        <SignUpWrapper>
            <SignUpHeader>I like</SignUpHeader>
            <SignUpFormWrapper wide={true}>
                <FlatList
                    data={interests}
                    extraData={selectedInterests}
                    horizontal={false}
                    numColumns={2}
                    renderItem={renderInterest}
                />
                <SignUpText>Connect only with people that like the same things as me</SignUpText>
                <Toggle
                    value={sameInterests}
                    onValueChange={sameInterests => setSameInterests(sameInterests)}
                    trackColor={{
                        false: '#8D99AE',
                        true: PURPLE
                    }}
                />
            </SignUpFormWrapper>
        </SignUpWrapper>
    );
}


// constant css values
const PURPLE = '#8002FE'
const INPUT_HEIGHT = '44px';
const INPUT_WIDTH = '252px';

const Container = styled.View`
    flex: 1;
`;

const Column = styled.View`
    display: flex;
    flex-direction: column;
`;

const Row = styled.View`
    display: flex;
`;

const Back = styled.Text`
    color: #1B1B1B;
    font-size: 36;
    font-weight: 900;
    margin: 12px 30px 0;
`;

const Continue = styled.View`
    background: ${props => props.page < 6 ? '#8D99AE' : '#439E73'};
    align-items: center;
    justify-content: center;
    height: 56px;
    margin-top: 16px;
`;

const PillButton = styled.View`
    align-items: center;
    justify-content: center;
    background: ${props => props.selected ? PURPLE : 'transparent'};
    border-color: ${props => props.selected ? PURPLE : '#1B1B1B'};
    border-style: solid;
    border-width: 1px;
    border-radius: 100px;
    height: 42px;
    width: 141px;
    margin: 0 11px 23px;
`;

const PillText = styled.Text(({ selected }) => ({
    color: selected ? 'white' : '#1B1B1B',
    fontWeight: selected ? '700' : '400'
}));

const ProgressBar = styled.View(({ page }) => ({
    backgroundColor: PURPLE,
    height: 11,
    width: `${(page / 6) * 100}%`,
}));

const SignUpWrapper = styled.View`
    flex: 1;
`;

const SignUpHeader = styled.Text`
    color: ${PURPLE};
    fontSize: 30px;
    lineHeight: 41px;
    margin: 16px 60px 32px;
`;

const SignUpFormWrapper = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: ${props => props.wide ? '0 40px' : '0 60px'};
`;

const SignUpTextInput = styled.TextInput`
    border-color: #1B1B1B;
    border-style: solid;
    border-bottom-width: 1px;
    font-size: 20px;
    font-style: ${props => props.value ? 'normal' : 'italic'};
    margin-bottom: 10px;
    padding: 10px;
    height: ${INPUT_HEIGHT};
    width: 100%;
`;

const SignUpText = styled.Text`
    color: black;
    font-size: 20px;
    line-height: 25px;
    margin-top: 20px;
    width: 252px;
`;

const SignUpTextValue = styled.Text`
    color: ${PURPLE};
    font-weight: 700;
`;

const Toggle = styled.Switch`
    margin-top: 16px;
    height: 36px;
    width: 80px;
`;

const styles = StyleSheet.create({});
