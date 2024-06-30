import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, TextInput, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, } from 'react-native'
 
import { useSelector } from 'react-redux'
import ProfileImage from '../components/ProfileImage'
import { SafeAreaView } from 'react-native-safe-area-context'

const ChatSetting = (props) => {
    const chatId = props.route.params.chatId
     const chatData = useSelector(state => state.chats.chatsData[chatId])
     const userData = useSelector(state => state.auth.userData)
 
  return (
    <ImageBackground source={require('../assets/img/Design.png')} resizeMode='cover' style={{ flex: 1 }}>
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <SafeAreaView style={{ alignItems: 'center', marginTop: '20%' }}>
                <ProfileImage showEditButton={true} width={95} height={95} chatId={chatId} userId={userData.userId} uri={chatData.chatImage}/>
            </SafeAreaView>


          
        </ScrollView>
    </KeyboardAvoidingView>
</ImageBackground>
  )
}

export default ChatSetting