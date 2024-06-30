import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Image } from 'react-native'
import {  Login, SignUp   } from '../screens'

import { createStackNavigator } from "@react-navigation/stack";
import { Color, FontFamily } from '../theme';

import BottomTabNavigator from './BottomTabNavigator';
import Introduction from '../screens/Introduction';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


const Stack = createStackNavigator();


const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={SignUp} options={({ navigation }) => ({
                title: 'Sign Up',
                headerTitleAlign: 'center',
                headerStyle: {
                    elevation: 0,
                    shadowOpacity: 0,
                },
                headerTitleStyle: {
                    color: Color.colorWhite,
                    fontFamily: FontFamily.soraBold,
                    fontSize: 20,
                    textTransform: 'capitalize',
                },
                headerTransparent: true,
                headerLeft: () => (
                    <TouchableOpacity style={{ marginLeft: 25, width: 12, height: 16, paddingHorizontal: 20 }} onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/app_icon/header/return-back.png')} style={{ width: 12, height: 12 }} />
                    </TouchableOpacity>
                ),
            })} />
        </Stack.Navigator>
    )
}

export default AuthNavigator