import React, { useState } from 'react';
import {
    Alert,
    Button,
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
    const [distance, setDistance] = useState(10);
    // screen 4
    const [birthDay, setBirthDay] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [ageRange, setAgeRange] = useState(new Array(2));
    // screen 5
    const [gender, setGender] = useState('');
    const [connectWith, setConnectWith] = useState('');

    function onBack() {
        if (page == 1) {
            props.navigation.navigate('SignIn');
        }
        else {
            setPage(page - 1);
        }
    }

    function onContinue() {
        // if (page == 1) {
        //     if (!username) {
        //         Alert.alert('Username is empty');
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

        if (page == 1) {
            fetch('https://fwbtngtv7j.execute-api.us-east-1.amazonaws.com/r2/sign-in/?username=sam&password=123')
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
            })
        }

        setPage(page + 1);
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
            setBirthDay={setBirthDay}
            setBirthMonth={setBirthMonth}
            setBirthYear={setBirthYear}
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
                <KeyboardAvoidingView behavior='height'>
                    <SafeAreaView>
                        <ProgressBar page={page} />
                        <Column>
                            <BackArrow onPress={onBack}>&#10094;</BackArrow>
                            {view}
                            <Button onPress={onContinue} title='Continue' style={styles.continue} />
                        </Column>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </LinearGradient>
        </Container>
    );
}

function SignUpOne(props) {
    return (
        <View>
            <Text style={styles.header}>Sign up</Text>
            <View style={styles.form}>
                <TextInput
                    autoFocus
                    name='username'
                    placeholder='Username'
                    value={props.username}
                    onChangeText={username => props.setUsername(username)}
                    style={styles.input}
                />
                <TextInput
                    keyboardType='email-address'
                    name='email'
                    placeholder='Email'
                    value={props.email}
                    onChangeText={email => props.setEmail(email)}
                    style={styles.input}
                />
                <TextInput
                    secureTextEntry
                    name='password'
                    placeholder='Password'
                    value={props.password}
                    onChangeText={password => props.setPassword(password)}
                    style={styles.input}
                />
                <TextInput
                    secureTextEntry
                    name='passwordRetype'
                    placeholder='Retype Password'
                    value={props.passwordRetype}
                    onChangeText={password => props.setPasswordRetype(password)}
                    style={styles.input}
                />
            </View>
        </View>
    );
}

function SignUpTwo(props) {
    return (
        <View>
            <Text style={styles.header}>My name is</Text>
            <View style={styles.form}>
                <TextInput
                    autoFocus
                    name='fname'
                    placeholder='First Name'
                    value={props.fname}
                    onChangeText={fname => props.setFname(fname)}
                    style={styles.input}
                />
                <TextInput
                    name='lname'
                    placeholder='Last Name'
                    value={props.lname}
                    onChangeText={lname => props.setLname(lname)}
                    style={styles.input}
                />
            </View>
        </View>
    );
}

function SignUpThree(props) {
    return (
        <View>
            <Text style={styles.header}>I live in</Text>
            <View style={styles.form}>
                <TextInput
                    autoFocus
                    placeholder='City'
                    value={props.city}
                    onChangeText={city => props.setCity(city)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='State'
                    value={props.state}
                    onChangeText={state => props.setState(state)}
                    style={styles.input}
                />
                <Text>Connect with people who are less than {props.distance} miles away</Text>
                <Slider
                    minimumValue={5}
                    maximumValue={50}
                    step={5}
                    value={props.distance}
                    onSlidingComplete={distance => props.setDistance(parseInt(distance))}
                />
            </View>
        </View>
    );
}

function SignUpFour(props) {
    return (
        <View>
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
                <Text>Connect with people who are between AGE_RANGE_LOW and AGE_RANGE_HIGH years old</Text>
            </View>
        </View>
    );
}

function SignUpFive(props) {
    return (
        <View>

        </View>
    );
}

function SignUpSix(props) {
    return (
        <View>

        </View>
    );
}


// Sign Up Colors
const PURPLE = '#8002FE'

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

const BackArrow = styled.Text`
    color: #1B1B1B;
    font-size: 36;
    font-weight: 900;
    margin: 12px 30px 0;
`;

const ProgressBar = styled.View(props => ({
    backgroundColor: PURPLE,
    height: 11,
    width: (props.page / 6) * 100 + '%',
}));

const styles = StyleSheet.create({
    back: {
        color: '#1B1B1B',
        fontSize: 36,
        fontWeight: '900',
    },
    continue: {
        backgroundColor: '#8D99AE',
        marginBottom: 'auto',
        marginTop: 'auto',
        width: '100%'
    },
    form: {
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        color: '#8002FE',
        fontSize: 30,
        lineHeight: 41,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 16,
        marginTop: 16,
    },
    input: {
        borderColor: '#1B1B1B',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        marginBottom: 10,
        padding: 10,
        height: 44,
        width: 252,
        fontSize: 20,
        fontStyle: 'italic',
    },
});
