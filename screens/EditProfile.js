import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, TextInput, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Color, FontFamily, FontSize } from '../theme'

import CityPicker from '../components/CityPicker'
import CustomButton from '../components/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserData,  updateUserEmail } from '../utils/actions/authActions'



import ProfileImage from '../components/ProfileImage'
import { updateLoginUserData } from '../store/authSlice'
import { getFirebaseApp } from '../utils/firebaseHalper'
 


const EditProfile = ({ navigation }) => {
    const dispatch = useDispatch();

    const userData = useSelector(state => state.auth.userData)
    console.log( userData.city);

 

    const [inputs, setInputs] = useState({
        email: userData.email || "",
        userName: userData.userName || "",
        city: userData.city || "",
        password: "",
        confirmPassword: "",
    })

    const onChangeText = (name, value) => {
        setInputs({
            ...inputs,
            [name]: value
        });
    };


    const emailRef = useRef(null);
    const userRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const focusTextInput = (inputRef) => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };


    const updateProfile =  async () => {
        const { email, userName, city, password } = inputs
         

         try {
                 
              await  updateUserEmail( userData.email, email, password)
              
             await updateUserData(userData.userId, { email, userName, city })
            dispatch(updateLoginUserData({newData: {email, userName, city,password}}));
        } catch (error) {
            console.log(error);
          }
      
    }



    return (
        <ImageBackground source={require('../assets/img/Design.png')} resizeMode='cover' style={{ flex: 1 }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                    <SafeAreaView style={{ alignItems: 'center', marginTop: '20%' }}>
                        <ProfileImage userId={userData.userId} uri={userData.profilePicURL} showEditButton={true} width={95} height={95}/>
                    </SafeAreaView>


                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Email</Text>
                        <TouchableOpacity onPress={() => focusTextInput(emailRef)} activeOpacity={1} style={styles.input}>

                            <TextInput value={inputs.email || userData.email} onChangeText={(value) => onChangeText('email', value)} ref={emailRef} style={{ color: Color.colorWhite }} placeholder='Enter your Email' placeholderTextColor={Color.colorGray_100} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Username</Text>
                        <TouchableOpacity onPress={() => focusTextInput(userRef)} activeOpacity={1} style={styles.input}>

                            <TextInput value={inputs.userName || userData.userName} onChangeText={(value) => onChangeText('userName', value)} ref={userRef} style={{ color: Color.colorWhite }} placeholder='Enter Username' placeholderTextColor={Color.colorGray_100} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.pickerLabel}>City</Text>
                        <View style={styles.picker}>
                        
                        <CityPicker value={inputs.city} onChange={(value) => onChangeText('city', value)} />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Password</Text>
                        <TouchableOpacity onPress={() => focusTextInput(passwordRef)} activeOpacity={1} style={styles.input}>
                            <TextInput  value={inputs.password} onChangeText={(value) => onChangeText('password', value)} ref={passwordRef} style={{ color: Color.colorWhite }} placeholder='Enter Password' placeholderTextColor={Color.colorGray_100} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Confirm password</Text>
                        <TouchableOpacity onPress={() => focusTextInput(confirmPasswordRef)} activeOpacity={1} style={styles.input}>
                            <TextInput ref={confirmPasswordRef} style={{ color: Color.colorWhite }} placeholder='Enter Password' placeholderTextColor={Color.colorGray_100} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ paddingHorizontal: 41, marginBottom: 31, marginTop: 24 }}>
                        <CustomButton onPress={updateProfile} title='Update' />

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>


    )
}

export default EditProfile



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
        paddingHorizontal: 28

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
