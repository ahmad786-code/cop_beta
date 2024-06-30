import React, { useEffect, useState, useCallback, useReducer } from 'react'
import { StyleSheet, Text, View, Keyboard, ImageBackground, ScrollView, Image, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, Alert, ActivityIndicator } from 'react-native'
import { Color, FontFamily } from '../theme'
import CustomButton from '../components/CustomButton'
import CityPicker from '../components/CityPicker'
import { reducer } from '../utils/reducers/formReducer'
import { signUp } from '../utils/actions/authActions'
import { useDispatch, useSelector } from 'react-redux'
 


const initialState = {
    inputValues: {
        email:  "",
        userName: "",
        city: "",
        password: "",
        confirmPassword: "",
    }
}



const SignUp = ({ navigation }) => {
    const dispach =  useDispatch()
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
   

    const [formState, dispatchFormState] = useReducer(reducer, initialState)

    const inputChangedHandler = useCallback((inputId, inputValue) => {
        dispatchFormState({ inputId, inputValue })
    }, [dispatchFormState]);

   

    const emailRef = React.useRef(null);
    const userRef = React.useRef(null);
    const passwordRef = React.useRef(null);
    const confirmPasswordRef = React.useRef(null);

    const focusTextInput = (inputRef) => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleSignUp =  async () => {
        const { email, userName, city, password, confirmPassword } = formState.inputValues;
        try {
            setIsLoading(true)
             const action = signUp(
                email,
                userName,
                city,
                password,
                confirmPassword,
                 
            )
            setError(null)
         await dispach(action)
        } catch (error) {
           setError(error.message)
           setIsLoading(false)
        }

    }

    useEffect(() => {
        if(error) {
            Alert.alert("An error occured", error)
        }
    },[error])

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/img/Design.png')} style={styles.container}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <ScrollView showsVerticalScrollIndicator={false} bounces={false} >
                        <View style={styles.signUpText}>
                            <Text style={styles.loginTitle}>Signup to continue </Text>
                            <Text style={styles.signupSubtitle}>Please create your account.</Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <TouchableOpacity onPress={() => focusTextInput(emailRef)} activeOpacity={1} style={styles.input}>

                                <TextInput id="email" onChangeText={(value) => inputChangedHandler('email', value)} ref={emailRef} style={{ color: Color.colorWhite }} placeholder='Enter your Email' placeholderTextColor={Color.colorGray_100} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Username</Text>
                            <TouchableOpacity onPress={() => focusTextInput(userRef)} activeOpacity={1} style={styles.input}>

                                <TextInput id="userName" onChangeText={(value) => inputChangedHandler('userName', value)} ref={userRef} style={{ color: Color.colorWhite }} placeholder='Enter Username' placeholderTextColor={Color.colorGray_100} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.pickerLabel}>City</Text>
                            <View style={styles.picker}>
                                <CityPicker onChange={(value) => inputChangedHandler('city', value)}/>
                            </View>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Password</Text>
                            <TouchableOpacity onPress={() => focusTextInput(passwordRef)} activeOpacity={1} style={styles.input}>
                                <TextInput id="password" onChangeText={(value) => inputChangedHandler('password', value)} ref={passwordRef} style={{ color: Color.colorWhite }} placeholder='Enter Password' placeholderTextColor={Color.colorGray_100} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Confirm password</Text>
                            <TouchableOpacity onPress={() => focusTextInput(confirmPasswordRef)} activeOpacity={1} style={styles.input}>
                                <TextInput id="confirmPassword" onChangeText={(value) => inputChangedHandler('confirmPassword', value)} ref={confirmPasswordRef} style={{ color: Color.colorWhite }} placeholder='Enter Password' placeholderTextColor={Color.colorGray_100} />
                            </TouchableOpacity>
                        </View>


                        <View style={styles.buttonContainer}>

                           { 
                                isLoading ? <ActivityIndicator size="small" color={Color.colorDarkslateblue}/> :   <CustomButton title='Sign up' onPress={handleSignUp} />
                            }
                          


                        </View>

                        <View style={styles.acountTextContainer}>
                            <Text style={styles.acountText}>Already have an account?  </Text>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Text style={[styles.acountText, { color: Color.colorDarkslateblue }]}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ImageBackground>
        </View>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },

    signUpText: {
        alignItems: 'flex-start',
        marginTop: 133,
        paddingHorizontal: 40,
        marginBottom: 37,

    },
    loginTitle: {
        color: Color.colorWhite,
        fontSize: 32,
        fontFamily: FontFamily.soraSemiBold,
        marginBottom: 8
    },
    signupSubtitle: {
        color: Color.colorGray_100,
        fontSize: 18,
        fontFamily: FontFamily.soraRegular
    },
    inputContainer: {
        paddingHorizontal: 41

    },
    inputLabel: {
        color: Color.colorWhite,
        fontSize: 16,
        fontFamily: FontFamily.soraRegular
    },

    input: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 17,
        paddingVertical: 20,
        paddingHorizontal: 27,
        backgroundColor: Color.colorGray_300,
        borderRadius: 12,
        marginTop: 4,
        marginVertical: 30
    },
    pickerLabel: {
        color: Color.colorWhite,
        fontSize: 16,
        fontFamily: FontFamily.soraRegular
    },
    picker: {
        paddingVertical: 8,
        backgroundColor: Color.colorGray_300,
        borderRadius: 12,
        marginTop: 4,
        marginBottom: 24
    },

    buttonContainer: {
        paddingTop: 45,
        paddingHorizontal: 41
    },
    acountTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 43,
        marginBottom: 34
    },
    acountText: {
        color: Color.colorWhite,
        fontFamily: FontFamily.soraRegular,
        fontSize: 16
    }
})