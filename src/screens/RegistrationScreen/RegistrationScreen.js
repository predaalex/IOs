import React, { useState, useRef } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View, Alert} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { firebase } from '../../firebase/config';
import styles from './styles';
import animationData from "../../../assets/animated_cocktail.json";
import LottieView from 'lottie-react-native';

import axios from "axios";

const api_key = "AIzaSyCajM9YfO0A5xf3wCz3zHSFj-Vy80djE4w";
const url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp" + "?key=" + api_key;

export default function RegistrationScreen({navigation}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    const onRegisterPress = async () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }
        try {
            console.log(url)
            const response = await axios.post(url,
                {
                  email:email,
                  password: password,
                }).then(console.log(response));

            localStorage.setItem("userName", "");
            localStorage.setItem("userEmail", email);
            navigation.navigate('Home');

        } catch (msg) {
            console.log(msg);
            Alert.alert("Eroare", "Eroare creare cont, verficati datele!");
        }
        // firebase
        //     .auth()
        //     .createUserWithEmailAndPassword(email, password)
        //     .then((response) => {
        //         const uid = response.user.uid
        //         const data = {
        //             id: uid,
        //             email,
        //             fullName,
        //         };
        //         const usersRef = firebase.firestore().collection('users')
        //         usersRef
        //             .doc(uid)
        //             .set(data)
        //             .then(() => {
        //                 navigation.navigate('Login')
        //             })
        //             .catch((error) => {
        //                 alert(error)
        //             });
        //     })
        //     .catch((error) => {
        //         alert(error)
        // });
    }

    const animation = useRef(null);
    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <View style={{alignItems:'center'}}>
                    <LottieView
                        autoPlay
                        ref={animation}
                        style={{
                        width: 200,
                        height: 200,
                        }}
                        source={animationData}
                    />
                </View>

                <TextInput
                    style={styles.input}
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}