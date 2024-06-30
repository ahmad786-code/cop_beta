import React , {useCallback, useEffect, useReducer, useState} from 'react'
import { Keyboard, StyleSheet, Text, View, ImageBackground, ScrollView, Image, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, ActivityIndicator, Alert } from 'react-native'
import { Color, FontFamily } from '../theme'
import CustomButton from '../components/CustomButton'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { reducer } from '../utils/reducers/formReducer'
import { login } from '../utils/actions/authActions'
import { useDispatch } from 'react-redux'
 
 
 
const initialState = {
    inputValues: {
        email: "",
        password: "", 
     
    }
    }
 

const Login = ({ navigation }) => {
    const dispach =  useDispatch()
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [formState, dispatchFormState] = useReducer(reducer, initialState)
      
    const inputChangedHandler = useCallback((inputId, inputValue) => {
        dispatchFormState({ inputId,  inputValue })
    }, [ dispatchFormState]);


    const { top } = useSafeAreaInsets()
    const userRef = React.useRef(null);
    const passwordRef = React.useRef(null);

    const focusTextInput = (inputRef) => {
        if (inputRef.current) {
            inputRef.current.focus();
          }
    };

  
    const handleLogin = async () => {
        const { email, password } = formState.inputValues;
        try {
            setIsLoading(true)
             const action = login(
                email,
                password
                 
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
                <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <ScrollView   showsVerticalScrollIndicator={false} bounces={false} >

                        <SafeAreaView style={{ marginTop: top }}>
                            <View style={styles.logoContainer}>
                                <Image source={require('../assets/COP_logo.png')} style={{width: 276, height: 121}}/>
                            </View>
                        </SafeAreaView>
                        <View style={styles.loginText}>
                            <Text style={styles.loginTitle}>Login to continue</Text>
                            <Text style={styles.loginSubtitle}>Please login to your account.</Text>
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Email</Text>

                            <TouchableOpacity onPress={() => focusTextInput(userRef)} activeOpacity={1} style={styles.input}>
                                <Image source={require('../assets/app_icon/login-page/username.png')} resizeMode='cover' style={{width:20, height:21}}/>
                                
                                <TextInput id='userName' onChangeText={(value) => inputChangedHandler('email', value)}  ref={userRef} style={{ color: Color.colorWhite }} placeholder='Enter Email' placeholderTextColor={Color.colorGray_100} />
                               
                            
                            </TouchableOpacity>


                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Password</Text>

                            <TouchableOpacity onPress={() => focusTextInput(passwordRef)} activeOpacity={1}  style={styles.input} >
                                <Image source={require('../assets/app_icon/login-page/password.png')} resizeMode='cover' style={{width:20, height:21}} />
                                <TextInput id='password'  onChangeText={(value) => inputChangedHandler('password', value)} ref={passwordRef} style={{ color: Color.colorWhite }} placeholder='Enter Password' placeholderTextColor={Color.colorGray_100} />
                            </TouchableOpacity>


                        </View>

                        <View style={styles.forgotContainer}>
                            <TouchableOpacity>
                                <Text style={styles.forgotText}>Forget password?</Text>

                            </TouchableOpacity>
                        </View>

                        <View style={styles.buttonContainer}>
                        { 
                                isLoading ? <ActivityIndicator size="small" color={Color.colorDarkslateblue}/> :    <CustomButton title='login' onPress={handleLogin} />
                            }
                               

                
                        </View>

                        <View style={styles.acountTextContainer}>
                            <Text style={styles.acountText}>Don’t have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                                <Text style={[styles.acountText, { color: Color.colorDarkslateblue }]}>Sign up</Text>
                            </TouchableOpacity>

                           
                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>
            </ImageBackground>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center'

    },
    logoContainer: {

        alignItems: 'center'
    },

    loginText: {
        alignItems: 'flex-start',
        marginTop: 10,
        paddingHorizontal: 40,
        marginBottom: 10
    },
    loginTitle: {
        color: Color.colorWhite,
        fontSize: 32,
        fontFamily: FontFamily.soraSemiBold,
        marginBottom: 8
    },
    loginSubtitle: {
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
    forgotContainer: {
        alignItems: 'flex-end',
        marginRight: 41
    },
    forgotText: {
        color: Color.colorDarkslateblue,
        fontSize: 16,
        fontFamily: FontFamily.soraRegular
    },
    buttonContainer: {
        paddingTop: 10,
        paddingHorizontal: 41
    },
    acountTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 34
    },
    acountText: {
        color: Color.colorWhite,
        fontFamily: FontFamily.soraRegular,
        fontSize: 16
    }
})