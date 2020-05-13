import React, { useState } from 'react';
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    SafeAreaView,
    Slider,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { LinearGradient} from 'expo-linear-gradient';
import styled from '@emotion/native'

export default function SignUp(props) {
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
    const [birthDay, setBirthDay] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [birthday, setBirthday] = useState('');
    const [ageRange, setAgeRange] = useState([23, 29]);
    // screen 5
    const [gender, setGender] = useState('');
    const [connectWith, setConnectWith] = useState('');

    function onBack() {
        page == 1 ? onBackToLogin() : setPage(page - 1);
    }

    function onBackToLogin() {
        props.navigation.navigate('SignIn');
    }

    function onContinue() {
        // if (page == 1) {
        //     if (!username) {
        //         Alert.alert('Username is empty');
        //         return;
        //     }
        //     else if (!email) {
        //         Alert.alert('Email is empty');
        //         return;
        //     }
        //     else if (!password || !passwordRetype) {
        //         Alert.alert('Password is empty');
        //         return;
        //     }
        //     else if (password != passwordRetype) {
        //         Alert.alert("Passwords don't match");
        //         return;
        //     }
        //     else {
        //         if (!validate()) {
        //             Alert.alert('Username is already taken');
        //             return;
        //         }
        //         if (!validate()) {
        //             Alert.alert('Email is already taken');
        //             return;
        //         }
        //     }
        // }
        // else if (page == 2) {
        //     if (!fname || !lname) {
        //         Alert.alert('Missing First or Last Name');
        //         return;
        //     }
        // }
        // else if (page == 3) {
        //     if (!city || !state) {
        //         Alert.alert('Missing City or State');
        //         return;
        //     }
        // }

        setPage(page + 1);
    }

    function validate() {
        // TODO: fill in later
        return true;
    }

    function onDone() {
        let email = `email=${email}`;
        let username = `username=${username}`;
        let password = `password=${password}`;
        let securityLevel = `security_level=user`;
        let info = `info=`;

        fetch(`http://192.168.1.15:8080/sign_up/?${email}&${username}&${password}&${securityLevel}&${info}`)
        .then(res => {
            console.log(res);
            return res.json();
        })
        .then(json => {
            console.log(json);
            return json;
        })
        .catch(err => {
            console.log('ERROR:', err);
            console.log(JSON.stringify(err));
        });
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
            birthDay={birthDay}
            birthMonth={birthMonth}
            birthYear={birthYear}
            ageRange={ageRange}
            setBirthDay={setBirthDay}
            setBirthMonth={setBirthMonth}
            setBirthYear={setBirthYear}
            setAgeRange={setAgeRange}
        />;
    }
    else if (page == 5) {
        view = <SignUpFive
            gender={gender}
            connectWith={connectWith}
            setGender={setGender}
            setConnectWith={setConnectWith}
        />;
    }
    else if (page == 6) {
        view = <SignUpSix />;
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
                            <TouchableWithoutFeedback onPress={onContinue}>
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

function SignUpOne(props) {
    return (
        <SignUpWrapper>
            <SignUpHeader>Sign up</SignUpHeader>
            <SignUpFormWrapper>
                <SignUpFormField
                    autoFocus
                    name='username'
                    placeholder='Username'
                    value={props.username}
                    onChangeText={username => props.setUsername(username)}
                    style={styles.input}
                />
                <SignUpFormField
                    keyboardType='email-address'
                    name='email'
                    placeholder='Email'
                    value={props.email}
                    onChangeText={email => props.setEmail(email)}
                    style={styles.input}
                />
                <SignUpFormField
                    secureTextEntry
                    name='password'
                    placeholder='Password'
                    value={props.password}
                    onChangeText={password => props.setPassword(password)}
                    style={styles.input}
                />
                <SignUpFormField
                    secureTextEntry
                    name='passwordRetype'
                    placeholder='Retype Password'
                    value={props.passwordRetype}
                    onChangeText={password => props.setPasswordRetype(password)}
                    style={styles.input}
                />
            </SignUpFormWrapper>
        </SignUpWrapper>
    );
}

function SignUpTwo(props) {
    return (
        <SignUpWrapper>
            <SignUpHeader>My name is</SignUpHeader>
            <SignUpFormWrapper>
                <SignUpFormField
                    autoFocus
                    name='fname'
                    placeholder='First Name'
                    value={props.fname}
                    onChangeText={fname => props.setFname(fname)}
                    style={styles.input}
                />
                <SignUpFormField
                    name='lname'
                    placeholder='Last Name'
                    value={props.lname}
                    onChangeText={lname => props.setLname(lname)}
                    style={styles.input}
                />
            </SignUpFormWrapper>
        </SignUpWrapper>
    );
}

function SignUpThree(props) {
    return (
        <SignUpWrapper>
            <SignUpHeader>I live in</SignUpHeader>
            <SignUpFormWrapper>
                <SignUpFormField
                    autoFocus
                    placeholder='City'
                    value={props.city}
                    onChangeText={city => props.setCity(city)}
                    style={styles.input}
                />
                <SignUpFormField
                    placeholder='State'
                    value={props.state}
                    onChangeText={state => props.setState(state)}
                    style={styles.input}
                />
                <SignUpText>
                    Connect with people who are less than <Text style={{color: PURPLE, fontWeight: 700}}>{props.distance}</Text> miles away
                </SignUpText>
                <MultiSlider
                    min={5}
                    max={50}
                    value={[props.distance]}
                    onValuesChange={distance => props.setDistance(parseInt(distance))}
                    selectedStyle={{backgroundColor: PURPLE}}
                    trackStyle={{backgroundColor: PURPLE}}
                />

                {/*
                <Slider
                    minimumValue={5}
                    maximumValue={50}
                    value={props.distance}
                    onValueChange={distance => props.setDistance(parseInt(distance))}
                    minimumTrackTintColor={PURPLE}
                    maximumTrackTintColor={PURPLE}
                    thumbTintColor={PURPLE}
                    style={{width: '100%'}}
                />
                */}
            </SignUpFormWrapper>
        </SignUpWrapper>
    );
}

function SignUpFour(props) {
    return (
        <SignUpWrapper>
            <Text>My birthday is</Text>
            <View style={styles.form}>
                <TextInput
                    autoFocus
                    keyboardType='number-pad'
                    maxLength={2}
                    placeholder='MM'
                    value={props.birthMonth}
                    onChangeText={month => props.setBirthMonth(month)}
                />
                <TextInput
                    keyboardType='number-pad'
                    maxLength={2}
                    placeholder='DD'
                    value={props.birthDay}
                    onChangeText={day => props.setBirthDay(day)}
                />
                <TextInput
                    keyboardType='number-pad'
                    maxLength={4}
                    placeholder='YYYY'
                    value={props.birthYear}
                    onChangeText={year => props.setBirthYear(year)}
                />
                <SignUpText>
                    Connect with people who are between <Text>{props.ageRange[0]}</Text> and <Text>{props.ageRange[1]}</Text> years old
                </SignUpText>
                <MultiSlider
                    min={21}
                    max={40}
                    values={props.ageRange}
                    onValuesChange={ageRange => props.setAgeRange(ageRange)}
                    selectedStyle={{backgroundColor: PURPLE}}
                    trackStyle={{backgroundColor: PURPLE}}
                />
            </View>
        </SignUpWrapper>
    );
}

function SignUpFive(props) {
    return (
        <SignUpWrapper>

        </SignUpWrapper>
    );
}

function SignUpSix(props) {
    return (
        <SignUpWrapper>

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

const ProgressBar = styled.View(props => ({
    backgroundColor: PURPLE,
    height: 11,
    width: `${(props.page / 6) * 100}%`,
}));

const SignUpWrapper = styled.View`
    flex: 1;
    margin: 0 60px;
`;

const SignUpHeader = styled.Text`
    color: ${PURPLE};
    fontSize: 30px;
    lineHeight: 41px;
    margin: 16px 0 32px;
`;

const SignUpFormWrapper = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const SignUpFormField = styled.TextInput`
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
    font-size: 18px;
    line-height: 25px;
    margin-top: 20px;
`;

const styles = StyleSheet.create({});
